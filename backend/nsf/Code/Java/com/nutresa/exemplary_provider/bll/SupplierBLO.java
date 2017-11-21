package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SupplierDAO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierBLO extends GenericBLO<SupplierDTO, SupplierDAO> {
    public SupplierBLO() {
        super(SupplierDAO.class);
    }

    @Override
    public SupplierDTO save(SupplierDTO dto) throws HandlerGenericException {
        SupplierDAO dao = new SupplierDAO();
        SupplierDTO supplier = null;
        try {
            supplier = dao.get(dto.getId());
            if (supplier.getIdCompanySize() != dto.getIdCompanySize()) {
                SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
                supplierByCallBLO.changedCompanySize(supplier.getIdCompanySize());
                NotificationBLO notificationBLO = new NotificationBLO();
                notificationBLO.notifyToLiberator();
            }

            dto = dao.save(dto);
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

}