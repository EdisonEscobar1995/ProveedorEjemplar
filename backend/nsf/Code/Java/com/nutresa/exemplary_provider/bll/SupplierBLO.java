package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.StateDAO;
import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.CustomerDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.StateDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.NotificationType;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierBLO extends GenericBLO<SupplierDTO, SupplierDAO> {

    public SupplierBLO() {
        super(SupplierDAO.class);
    }

    @Override
    public SupplierDTO save(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO dao = new SupplierDAO();
        SupplierDTO currentSupplier = dao.get(supplier.getId());
        supplier.autoSetIdDocuments();
        supplier.autoSetIdAttachedFinancialReport();

        CustomerBLO customerBLO = new CustomerBLO();
        customerBLO.deleteCustomers(customerBLO.getCustomersBySupplier(currentSupplier.getId()));
        AttachmentBLO attachmentBLO = new AttachmentBLO();
        attachmentBLO.deleteDocuments(currentSupplier.getDocument());
        attachmentBLO.deleteDocuments(currentSupplier.getAttachedFinancialReport());

        savePrincipalCustomers(supplier.getPrincipalCustomer(), supplier.getId());

        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        supplierByCallBLO.participateInCall();
        if (!currentSupplier.getIdCompanySize().equals(supplier.getIdCompanySize())) {
            supplierByCallBLO.changedCompanySize(currentSupplier.getIdCompanySize());
            dao.update(supplier.getId(), supplier);
            NotificationBLO notificationBLO = new NotificationBLO();
            notificationBLO.notifyChangeCompanySize(supplier.getId());
        }

        currentSupplier = dao.update(supplier.getId(), supplier);
        currentSupplier.setPrincipalCustomer(customerBLO.getCustomersBySupplier(currentSupplier.getId()));
        return currentSupplier;
    }

    protected void createInitialSupplier(SupplierDTO supplier) throws HandlerGenericException {
        super.save(supplier);
    }

    public SupplierDTO getSupplierInSession(String idSupplier) throws HandlerGenericException {
        SupplierDTO response = null;
        SupplierDAO dao = new SupplierDAO();
        response = dao.getSupplierByFullName(null);

        if (null == response) {
            UserBLO userBLO = new UserBLO();
            if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())
                    || userBLO.isRol(Rol.EVALUATOR.toString())) {
                response = dao.getSupplierByFullName(idSupplier);
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
            }
        }

        if (null != response) {
            AttachmentBLO attachmentBLO = new AttachmentBLO();
            CustomerBLO customerBLO = new CustomerBLO();
            response.setDocument(attachmentBLO.getDocuments(response.getIdDocuments()));
            response.setAttachedFinancialReport(attachmentBLO.getDocuments(response.getIdAttachedFinancialReport()));
            response.setPrincipalCustomer(customerBLO.getCustomersBySupplier(response.getId()));
        }

        return response;
    }

    public QuestionsBySurveyDTO getQuestionsBySurvey(String idSurvey, String idDimension, String idSupplierByCall)
            throws HandlerGenericException {
        QuestionsBySurveyDTO response = new QuestionsBySurveyDTO();
        CriterionBLO criterionBLO = new CriterionBLO();
        QuestionBLO questionsBLO = new QuestionBLO();
        response.setCriterion(criterionBLO.getCriterionsBySurvey(idSurvey, idDimension));
        response.setQuestions(questionsBLO.getQuestionsBySurvey(idDimension, idSupplierByCall));
        return response;
    }

    public InformationFromSupplier getModifiedSuppliers(String year) throws HandlerGenericException {
        String viewName = "vwSuppliersByCallModifiedIdCall";
        return getInformationByYearInView(year, viewName);
    }

    public SupplierDTO update(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        return supplierDAO.update(supplier.getId(), supplier);
    }

    public SupplierDTO sendInvitation(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        NotificationBLO notification = new NotificationBLO();
        notification.sendNotificationTypeToSupplier(supplier, NotificationType.SUPPLIER_CALLED_BY_LIBERATOR);
        return supplierDAO.get(supplier.getId());
    }

    public boolean supplierWasInCall() throws HandlerGenericException {
        boolean response = false;
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        SupplierDAO supplierDAO = new SupplierDAO();
        SupplierDTO supplier = supplierDAO.getSupplierByFullName(null);
        if (null != supplier && null != supplierByCallBLO.getBy("idSupplier", supplier.getId())) {
            response = true;
        }
        return response;
    }

    public Map<String, String> getInformationInOtherDataBase(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        return supplierDAO.getInformationInOtherDataBase(supplier);
    }

    protected InformationFromSupplier getInformationFromSuppliers(List<Object> listYears, List<DTO> callsFound)
            throws HandlerGenericException {
        InformationFromSupplier response = new InformationFromSupplier();
        Map<String, List<Object>> listIdsSupplierByCall;
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        SupplierDAO supplierDAO = new SupplierDAO();
        StateDAO stateDAO = new StateDAO();

        try {
            listIdsSupplierByCall = Common.getDtoFields(callsFound, new String[] { "[idSupplier]", "[idState]" },
                    SupplierByCallDTO.class);
            List<SupplierDTO> suppliers = supplierDAO.getAllBy("id", Common.getIdsFromList(listIdsSupplierByCall
                    .get("[idSupplier]")));
            List<StateDTO> states = stateDAO.getAllBy("id", Common.getIdsFromList(listIdsSupplierByCall
                    .get("[idState]"), true));

            String[] idFieldNames = { "Category", "Country", "Department", "City", "Supply", "SubCategory",
                    "CompanyType", "SocietyType", "Sector" };
            Map<String, List<Object>> masterIds = Common.getDtoFields(suppliers, idFieldNames, SupplierDTO.class);

            Map<String, List<DTO>> masters = getMasters(idFieldNames, masterIds, true);
            masters.put("CompanySize", companySizeBLO.getAll());
            response.setStates(states);
            response.setMasters(masters);
            response.setSuppliers(suppliers);
            response.setSuppliersByCall(callsFound);
            response.setYears(listYears);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public InformationFromSupplier getSummaryWithSurvey(String year) throws HandlerGenericException {
        String viewName = "vwSuppliersByCallIdCall";
        return getInformationByYearInView(year, viewName);
    }

    public InformationFromSupplier getInformationByYearInView(String year, String viewName)
            throws HandlerGenericException {
        CallBLO callBLO = new CallBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        InformationFromSupplier response = new InformationFromSupplier();
        List<Object> listYears;

        try {
            listYears = getFieldAll(0, "vwCallsByYear");
            if (null == year || year.isEmpty()) {
                year = (String) listYears.get(0);
            }

            List<DTO> callsByYear = supplierByCallBLO.getAllBy("idCall", callBLO.getIdCallByYear(year), viewName);
            response = getInformationFromSuppliers(listYears, callsByYear);
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    private void savePrincipalCustomers(List<CustomerDTO> principalCustomers, String idSupplier)
            throws HandlerGenericException {
        if (null != principalCustomers && !principalCustomers.isEmpty()) {
            CustomerBLO customerBLO = new CustomerBLO();
            for (CustomerDTO customer : principalCustomers) {
                if (null != customer.getName() && !customer.getName().trim().isEmpty()
                        && customer.getPercentageOfParticipationInSales() >= 0) {
                    customer.setIdSupplier(idSupplier);
                    customer.setId(null);
                    customerBLO.save(customer);
                }
            }
        }
    }

    /**
     * Busca los proveedores por convocatoria o por la especificaciÃ³n de algÃºn
     * filtro.
     * <p>
     * Si y solo si no se especifica un filtro de bÃºsqueda entonces busca por
     * convocatoria.
     * 
     * @param idCall
     *            Identificador de la convocatoria
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return ColecciÃ³n de proveedores.
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> getThemByIdCallOrFiltered(String idCall, Map<String, String> parameters)
            throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        Map<String, String> fieldsToFilter = supplierDAO.identifyFieldsToFTSearch(parameters);
        List<SupplierDTO> response = null;

        if (!fieldsToFilter.isEmpty()) {
            response = supplierDAO.getThemWithFilter(fieldsToFilter);
        } else {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            response = supplierByCallBLO.getSuppliersByCall(idCall);
        }

        return response;
    }

    /**
     * Obtiene los proveedores que ya terminaron la evaluaciÃ³n y los que han
     * sido evaluados parcialmente por el evaluador.
     * 
     * @param year
     *            AÃ±o de la convocatoria
     * @return ColecciÃ³n de datos encontrados
     * @throws HandlerGenericException
     */
    public InformationFromSupplier pendingToQualify(String year) throws HandlerGenericException {
        try {
            InformationFromSupplier response = null;
            CallBLO callBLO = new CallBLO();
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            List<Object> listYears;
            listYears = getFieldAll(0, "vwCallsByYear");
            if (null == year || year.isEmpty()) {
                year = (String) listYears.get(0);
            }

            UserBLO userBLO = new UserBLO();
            if (userBLO.isRol(Rol.EVALUATOR.toString()) || userBLO.isRol(Rol.LIBERATOR.toString())
                    || userBLO.isRol(Rol.ADMINISTRATOR.toString())) {
                List<String> states = new ArrayList<String>();
                states.add(SurveyStates.EVALUATOR.toString());
                states.add(SurveyStates.NOT_STARTED_EVALUATOR.toString());
                states.add(SurveyStates.ENDED_EVALUATOR.toString());
                List<DTO> callsByYear = supplierByCallBLO.getByStates(callBLO.getIdCallByYear(year), states);
                response = getInformationFromSuppliers(listYears, callsByYear);
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
            }

            if (!(response instanceof InformationFromSupplier)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
            }

            return response;
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
    }

    protected SupplierDTO createByFirstTime(SupplierDTO supplier) throws HandlerGenericException {
        SupplierDTO supplierExisting = null;
        if(null != supplier.getId() && !supplier.getId().isEmpty()){
            supplierExisting = this.get(supplier.getId());
            supplierExisting.setSapCode(supplier.getSapCode());
            supplierExisting.setNit(supplier.getNit());
            supplierExisting.setBusinessName(supplier.getBusinessName());
            supplierExisting.setFullName(supplier.getFullName());
            supplierExisting.setEmails(supplier.getEmails());
            supplierExisting.setIdCountry(supplier.getIdCountry());
            supplierExisting.setIdCompanySize(supplier.getIdCompanySize());
            supplierExisting.setIdSupply(supplier.getIdSupply());
            return super.save(supplierExisting);
        } else {
            return super.save(supplier);
        }
        
    }

    /**
     * @param nit
     * @return <code>true</code> si el proveedor existe en el directorio
     *         general, de lo contrario <code>false</code>
     * @throws HandlerGenericException
     */
    protected boolean existInGeneralDirectoryByNit(String nit) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        return supplierDAO.existInGeneralDirectoryByNit(nit);
    }

    /**
     * @param sapCode
     * @param nit
     * @return Proveedor existente
     * @throws HandlerGenericException
     */
    protected SupplierDTO getBySAPCodeOrNIT(String sapCode, String nit) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        SupplierDTO supplier = supplierDAO.getBySAPCodeOrNIT(sapCode, nit);
        return supplier;
    }

    /**
     * Busca los proveedores que contengan <code>text</code> en el campo cÃ³digo
     * sap
     * 
     * @param text
     *            valor a buscar en los documentos
     * @return ColecciÃ³n de proveedores que coinciden con el valor a buscar
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> searchSupplier(String text) throws HandlerGenericException {
        SupplierDAO supplierDAO = new SupplierDAO();
        return supplierDAO.searchSupplier(text);
    }

    /**
     * Obtiene el usuario y contraseÃ±a de un proveedor desde el directorio
     * general
     * 
     * @param supplier
     *            Proveedor a buscar
     * @return ColecciÃ³n clave valor de usuario y contraseÃ±a
     * @throws HandlerGenericException
     */
    protected Map<String, String> getUserAndPassword(SupplierDTO supplier) throws HandlerGenericException {
        Map<String, String> informationInOtherDataBase = getInformationInOtherDataBase(supplier);
        Map<String, String> detail = new LinkedHashMap<String, String>();
        if (!informationInOtherDataBase.isEmpty()) {
            detail.put("Usuario", informationInOtherDataBase.get("userName"));
            detail.put("Contraseña", informationInOtherDataBase.get("password"));
        }

        return detail;
    }

}
