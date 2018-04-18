package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.openntf.domino.ext.Name;
import org.openntf.domino.ext.Name.NamePartKey;

import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.dtl.AccessByRolDTO;
import com.nutresa.exemplary_provider.dtl.AccessDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserBLO extends GenericBLO<UserDTO, UserDAO> {

    public UserBLO() {
        super(UserDAO.class);
    }

    protected UserDTO getUserInSession() throws HandlerGenericException {
        UserDAO userDAO = new UserDAO();
        return userDAO.getUserInSession();
    }

    public List<DTO> getRolsByUser() throws HandlerGenericException {
        UserDTO userInSession = getUserInSession();
        RolBLO rolBLO = new RolBLO();
        List<DTO> rols = null;
        if (null != userInSession) {
            List<Object> idRols = new ArrayList<Object>();
            idRols.addAll(userInSession.getIdRols());
            rols = rolBLO.getAllBy("id", Common.getIdsFromList(idRols));
        } else {
            SupplierBLO supplierBLO = new SupplierBLO();
            if (supplierBLO.supplierWasInCall()) {
                rols = rolBLO.getAllBy("shortName", "SUPPLIER");
            }
        }

        return rols;
    }

    public List<String> loadAccess() throws HandlerGenericException {
        AccessByRolBLO accessByRolBLO = new AccessByRolBLO();
        AccessBLO accessBLO = new AccessBLO();
        List<String> response = new ArrayList<String>();
        List<DTO> rols = getRolsByUser();
        if (null != rols && !rols.isEmpty()) {
            Map<String, List<Object>> list = Common.getDtoFields(rols, new String[] { "[id]" }, RolDTO.class);
            List<DTO> listAccessByRol = accessByRolBLO.getAllBy("idRol", Common.getIdsFromList(list.get("[id]")));
            list = Common.getDtoFields(listAccessByRol, new String[] { "[idAccess]" }, AccessByRolDTO.class);
            List<DTO> listAccess = accessBLO.getAllBy("id", Common.getIdsFromList(list.get("[idAccess]")));
            for (Object access : listAccess) {
                AccessDTO a = (AccessDTO) access;
                response.add(a.getApi() + "." + a.getAction());
            }
        }
        return response;
    }

    public Map<String, Object> getUserContext() throws HandlerGenericException {
        Map<String, Object> userContext = new LinkedHashMap<String, Object>();
        List<DTO> rols = getRolsByUser();
        if (null != rols) {
            MenuBLO menuBLO = new MenuBLO();
            UserDAO userDAO = new UserDAO();
            Name dominoUser = userDAO.getDominoUser();
            Map<String, String> userInfo = new LinkedHashMap<String, String>();
            userInfo.put("name", dominoUser.getNamePart(NamePartKey.Common));
            userInfo.put("canonical", dominoUser.getNamePart(NamePartKey.Canonical));
            userContext.put("userInfo", userInfo);
            userContext.put("rols", rols);
            userContext.put("menu", menuBLO.getMenusByRol());
        }

        return userContext;
    }

    protected boolean isRol(String shortNameRol) throws HandlerGenericException {
        List<DTO> rols = getRolsByUser();
        boolean response = false;
        for (DTO record : rols) {
            RolDTO rol = (RolDTO) record;
            if (rol.getShortName().equals(shortNameRol)) {
                response = true;
                break;
            }
        }

        return response;
    }

    public UserDTO whoEvaluateSurvey(String idSupplierByCall) throws HandlerGenericException {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        UserDTO evaluator = null;
        if (idSupplierByCall.trim().isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INVALID_VALUE.toString());
        }

        SupplierByCallDTO supplierByCall = supplierByCallBLO.get(idSupplierByCall);
        if (!(supplierByCall instanceof SupplierByCallDTO) || supplierByCall.getWhoEvaluate().isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.DONT_HAVE_EVALUATOR.toString());
        } else {
            evaluator = super.get(supplierByCall.getWhoEvaluate());
            if (!(evaluator instanceof UserDTO)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
            }
        }

        return evaluator;
    }

    protected String getCommonName(String name) throws HandlerGenericException {
        UserDAO userDAO = new UserDAO();
        return userDAO.getCommonName(name);
    }

    protected List<String> getUserEmailsByRol(String rolName) throws HandlerGenericException {
        RolBLO rolBLO = new RolBLO();
        List<String> emails = new ArrayList<String>();
        RolDTO rol = rolBLO.getRolByShortName(rolName);
        List<UserDTO> users = getUsersByRol(rol.getId());
        if (!users.isEmpty()) {
            for (UserDTO user : users) {
                emails.add(user.getEmail());
            }
        }

        return emails;
    }

    protected List<UserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        UserDAO userDAO = new UserDAO();
        return userDAO.getUsersByRol(idRol);
    }

    protected void notifyToTechnicalTeam(Map<String, String> fieldsToIdentifyTechnicalTeam)
            throws HandlerGenericException {
        Map<String, String> filter = new LinkedHashMap<String, String>();
        Iterator<String> iterator = fieldsToIdentifyTechnicalTeam.keySet().iterator();
        String key;
        String[] valueInFields;
        while (iterator.hasNext()) {
            UserDAO userDAO = new UserDAO();
            RolBLO rolBLO = new RolBLO();
            TechnicalTeamBLO technicalTeamBLO = new TechnicalTeamBLO();
            List<UserDTO> userWithTechnicalTeamRol = userDAO
                    .getUsersByRol(rolBLO.getRolByShortName(Rol.TECHNICAL_TEAM.toString()).getId());
            NotificationBLO notificationBLO = new NotificationBLO();
            List<String> technicalTeamEmails = new ArrayList<String>();

            key = iterator.next();
            valueInFields = key.split(":");

            for (UserDTO user : userWithTechnicalTeamRol) {
                filter.put("USER", user.getId());
                filter.put("SUPPLY", valueInFields[0]);
                filter.put("CATEGORY", valueInFields[1]);
                filter.put("COUNTRY", valueInFields[2]);
                List<TechnicalTeamDTO> especificTechnicalTeamMembers = technicalTeamBLO
                        .getMembersByEspecificFeactures(filter);
                if (!especificTechnicalTeamMembers.isEmpty()) {
                    technicalTeamEmails.add(user.getEmail());
                }
            }

            notificationBLO.notifyToTechnicalTeam(technicalTeamEmails);
        }
    }

    protected void notifyToManagerTeam(String idCall) throws HandlerGenericException {
        ManagerTeamBLO managerTeamByCallBLO = new ManagerTeamBLO();
        NotificationBLO notificationBLO = new NotificationBLO();
        List<String> idManagerTeamMembers = managerTeamByCallBLO.getIdOfManagerTeamMembersInCall(idCall);
        List<String> managerTeamEmails = new ArrayList<String>();

        for (String idMember : idManagerTeamMembers) {
            UserDAO userDAO = new UserDAO();
            managerTeamEmails.add(userDAO.get(idMember).getEmail());
        }

        notificationBLO.notifyToManagerTeam(managerTeamEmails);
    }

    protected String getNameUserInSession() {
        UserDAO userDAO = new UserDAO();
        return userDAO.getNameUserInSession();
    }

    public List<UserDTO> searchUser(String text) throws HandlerGenericException {
        UserDAO userDAO = new UserDAO();
        return userDAO.searchUser(text);
    }

}