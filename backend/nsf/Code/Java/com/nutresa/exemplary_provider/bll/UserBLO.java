package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.dtl.AccessByRolDTO;
import com.nutresa.exemplary_provider.dtl.AccessDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class UserBLO extends GenericBLO<UserDTO, UserDAO> {

    public UserBLO() {
        super(UserDAO.class);
    }

    public List<UserDTO> getUsersByRol(String idRol) throws HandlerGenericException {
        List<UserDTO> users = new ArrayList<UserDTO>();
        try {
            UserDAO userDAO = new UserDAO();
            users = userDAO.getUsersByRol(idRol);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return users;
    }

    private UserDTO getUserInSession() throws HandlerGenericException {
        UserDAO userDAO = new UserDAO();
        return userDAO.getUserInSession();
    }

    public List<DTO> getRolsByUser() throws HandlerGenericException {
        UserDTO userInSession = getUserInSession();
        SupplierBLO supplierBLO = new SupplierBLO();
        RolBLO rolBLO = new RolBLO();
        List<DTO> rols = null;
        if (null != userInSession) {
            List<Object> idRols = new ArrayList<Object>();
            idRols.addAll(userInSession.getIdRols());
            rols = rolBLO.getAllBy("id", Common.getIdsFromList(idRols));
        } else {
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

}