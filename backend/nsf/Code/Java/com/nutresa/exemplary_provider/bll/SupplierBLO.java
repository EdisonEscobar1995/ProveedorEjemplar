package com.nutresa.exemplary_provider.bll;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.ModifiedSupplierDTO;
import com.nutresa.exemplary_provider.dtl.QuestionsBySurveyDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierBLO extends GenericBLO<SupplierDTO, SupplierDAO> {
    public SupplierBLO() {
        super(SupplierDAO.class);
    }

    @Override
    public SupplierDTO save(SupplierDTO dto) throws HandlerGenericException {
        SupplierDAO dao = new SupplierDAO();
        SupplierDTO supplier = null;
        dto.autoSetIdDocuments();
        dto.autoSetIdAttachedFinancialReport();
        try {
            supplier = dao.get(dto.getId());
            if (!supplier.getIdCompanySize().equals(dto.getIdCompanySize())) {
                SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
                supplierByCallBLO.changedCompanySize(supplier.getIdCompanySize());
                NotificationBLO notificationBLO = new NotificationBLO();
                notificationBLO.notifyChangeCompanySize();
            }

            dto = dao.update(dto.getId(),dto);
            if (null != dto.getPrincipalCustomer()) {
                CustomerBLO customer = new CustomerBLO();
                dto.setPrincipalCustomer(customer.saveList(dto.getPrincipalCustomer(), "id" + dao.getEntity(), dto
                        .getId()));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return dto;
    }

    public SupplierDTO getSupplierInSession() throws HandlerGenericException {
        SupplierDTO supplier = null;
        SupplierDAO dao = new SupplierDAO();
        try {
            supplier = dao.getSupplierInDirectory();
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return supplier;
    }

    public QuestionsBySurveyDTO getQuestionsBySurvey(String idSurvey, String idDimension)
            throws HandlerGenericException {
        QuestionsBySurveyDTO response = new QuestionsBySurveyDTO();
        CriterionBLO criterionBLO = new CriterionBLO();
        QuestionBLO questionsBLO = new QuestionBLO();
        try {
            response.setCriterion(criterionBLO.getCriterionsBySurvey(idSurvey, idDimension));
            response.setQuestions(questionsBLO.getQuestionsBySurvey(idSurvey, idDimension));
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }

    public ModifiedSupplierDTO getModifiedSuppliers() throws HandlerGenericException {
        List<Object> listIds;
        SupplierDAO SupplierDAO = new SupplierDAO(); 
        Map<String, List<DTO>> response = new HashMap<String, List<DTO>>();
        
        ModifiedSupplierDTO response2 = new ModifiedSupplierDTO();
        
        try {
            listIds = SupplierDAO.getFieldAll(1, "vwSuppliersByCallModified");
            String ids = Common.getIdsFromList(listIds);
            List<SupplierDTO> suppliers = SupplierDAO.getAllBy("id", ids);
            String[] idFieldNames = { "Category", "Country", "Supply", "CompanySize" };
            Map<String, List<Object>> joinIds = SupplierDAO.getJoinIds(suppliers, idFieldNames);

            response = getMasters(idFieldNames, joinIds);
            response2.setSuppliers(suppliers);
            response2.setMasters(response);
            
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        return response2;
    }
    
    private Map<String, List<DTO>> getMasters(String[] idFieldNames, Map<String, List<Object>> joinIds) throws HandlerGenericException {
        Map<String, List<DTO>> masters = new HashMap<String, List<DTO>>();
        
        CategoryBLO CategoryBLO = new CategoryBLO();
        CountryBLO CountryBLO = new CountryBLO();
        CompanySizeBLO CompanySizeBLO = new CompanySizeBLO();
        SupplyBLO SupplyBLO = new SupplyBLO(); 

        try {
            masters.put("Category", CategoryBLO.getAllBy("id", Common.getIdsFromList(joinIds.get("Category"), true)));
            masters.put("Country", CountryBLO.getAllBy("id", Common.getIdsFromList(joinIds.get("Country"), true)));
            masters.put("CompanySize", CompanySizeBLO.getAllBy("id", Common.getIdsFromList(joinIds.get("CompanySize"), true)));
            masters.put("Supply", SupplyBLO.getAllBy("id", Common.getIdsFromList(joinIds.get("Supply"), true)));
        } catch (HandlerGenericException e) {
            throw new HandlerGenericException(e);
        }
        return masters;
    }
}
