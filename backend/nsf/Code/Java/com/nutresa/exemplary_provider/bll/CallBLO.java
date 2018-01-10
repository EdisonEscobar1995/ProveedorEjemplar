package com.nutresa.exemplary_provider.bll;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SuppliersInCallDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallBLO extends GenericBLO<CallDTO, CallDAO> {

    public CallBLO() {
        super(CallDAO.class);
    }

    public CallDTO massiveShipmentCall(String idCall) throws HandlerGenericException {
        CallBLO callBLO = new CallBLO();
        CallDTO response = null;
        List<SupplierDTO> suppliers = null;
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        suppliers = supplierByCallBLO.getSuppliersByCallDontInvited(idCall);
        for (SupplierDTO supplier : suppliers) {
            NotificationBLO notification = new NotificationBLO();
            notification.sendInvitation(supplier);
            supplierByCallBLO.markToInvited(supplier.getId(), idCall);
        }

        response = callBLO.get(idCall);
        return response;
    }

    public SuppliersInCallDTO getSuppliersInCall(String idCall) throws HandlerGenericException {
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        SuppliersInCallDTO response = new SuppliersInCallDTO();
        Map<String, List<Object>> listIds;
        SupplierBLO supplierBLO = new SupplierBLO();
        List<DTO> supplierByCall = supplierByCallBLO.getAllBy("idCall", idCall, "vwSuppliersByCallIdCall");
        try {
            listIds = Common.getDtoFields(supplierByCall, new String[] { "[idSupplier]" }, SupplierByCallDTO.class);
            // Consultar los proveedores que se encuentran bloqueados o
            // notificados para las convocatorias del año seleccionado
            List<DTO> suppliers = supplierBLO.getAllBy("id", Common.getIdsFromList(listIds.get("[idSupplier]")));
            // Realizar el cruce de los maestros según los datos de los
            // proveedores seleccionados
            String[] idFieldNames = { "CompanySize", "Supply" };
            Map<String, List<Object>> masterIds = Common.getDtoFields(suppliers, idFieldNames, SupplierDTO.class);

            Map<String, List<DTO>> masters = getMasters(idFieldNames, masterIds, true);
            response.setMasters(masters);
            response.setSuppliers(suppliers);
            response.setSuppliersByCall(supplierByCall);

        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }
        return response;
    }

    protected String getIdCallByYear(String year) throws HandlerGenericException {
        Map<String, List<Object>> listIds;
        List<DTO> listCalls = getAllBy("year", year);
        listIds = Common.getDtoFields(listCalls, new String[] { "[id]" }, CallDTO.class);
        return Common.getIdsFromList(listIds.get("[id]"));
    }

}
