package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SuppliersInCallDTO;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfAverageGradeBySuppliers;
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

    public InformationFromSupplier getParticipantsByYear(String year) throws HandlerGenericException {
        List<Object> listYears = getFieldAll(0, "vwCallsByYear");
        if (null == year || year.trim().isEmpty()) {
            year = (String) listYears.get(0);
        }

        SupplierBLO supplierBLO = new SupplierBLO();
        InformationFromSupplier response = null;
        SupplierDTO supplier = supplierBLO.getSupplierInSession(null);
        if (null == supplier) {
            UserBLO userBLO = new UserBLO();
            if (userBLO.isRol("LIBERATOR") || userBLO.isRol("ADMINISTRATOR")) {
                response = supplierBLO.getSummaryWithSurvey(year);
            } else {
                throw new HandlerGenericException("ROL_INVALID");
            }
        } else {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            Map<String, String> filter = new HashMap<String, String>();
            filter.put("idSupplier", supplier.getId());
            filter.put("idCall", getIdCallByYear(year));
            List<DTO> callsBySupplier = supplierByCallBLO.getAllBy(filter, "vwSuppliersByCallInIdSupplierAndIdCall");
            response = supplierBLO.getInformationFromSuppliers(listYears, callsBySupplier);
        }

        return response;
    }

    /**
     * @param parameters Mapa clave valor de los filtros por los que se van a optener los resultados
     * @return Collección de datos obtenidos según los parámetros <code>parameters</code>
     * @throws HandlerGenericException Con mensaje <code>CALL_NOT_ESPECIFIED</code> si no se envía el
     *         identificador de la convocatoria en los parámetros de búsqueda.
     *         Con mensaje <code>INFORMATION_NOT_FOUND</code> si no se encontró información para exportar.
     *         Con mensaje <code>ROL_INVALID</code> si el usuario en sesión no tiene el rol permitido.
     */
    public List<ReportOfAverageGradeBySuppliers> getReportOfAverageGradeBySupplier(Map<String, String> parameters)
            throws HandlerGenericException {
        List<ReportOfAverageGradeBySuppliers> response = new ArrayList<ReportOfAverageGradeBySuppliers>();

        UserBLO userBLO = new UserBLO();
        if (userBLO.isRol("LIBERATOR") || userBLO.isRol("ADMINISTRATOR")) {
            String idCall = parameters.get("call");
            if (null != idCall && !idCall.isEmpty()) {
                SupplierBLO supplierBLO = new SupplierBLO();
                List<SupplierDTO> suppliers = supplierBLO.getThemByIdCallOrFiltered(idCall, parameters);
                if (!suppliers.isEmpty()) {
                    response = buildReportOfAverageGradeBySupplier(idCall, suppliers, parameters);
                }
            } else {
                throw new HandlerGenericException("CALL_NOT_ESPECIFIED");
            }

            if (response.isEmpty()) {
                throw new HandlerGenericException("INFORMATION_NOT_FOUND");
            }
        } else {
            throw new HandlerGenericException("ROL_INVALID");
        }

        return response;
    }

    /**
     * @param idCall Identificador de la convocatoria que se va consultar.
     * @param suppliers Collección de proveedores
     * @param parameters Mapa clave valor de los filtros por los que se van a optener los resultados
     * @return Collección de registros del reporte
     * @throws HandlerGenericException
     */
    private List<ReportOfAverageGradeBySuppliers> buildReportOfAverageGradeBySupplier(String idCall,
            List<SupplierDTO> suppliers, Map<String, String> parameters) throws HandlerGenericException {
        List<ReportOfAverageGradeBySuppliers> response = new ArrayList<ReportOfAverageGradeBySuppliers>();
        for (SupplierDTO supplier : suppliers) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            SupplierByCallDTO supplierByCall = supplierByCallBLO.getByIdCallAndIdSupplierFinished(idCall,
                    supplier.getId());
            if (supplierByCall instanceof SupplierByCallDTO) {
                ReportOfAverageGradeBySuppliers recordOfReport = new ReportOfAverageGradeBySuppliers();
                AnswerBLO answerBLO = new AnswerBLO();
                recordOfReport.setNit(supplier.getNit());
                recordOfReport.setSapCode(supplier.getSapCode());
                recordOfReport.setName(supplier.getBusinessName());
                recordOfReport = answerBLO.buildReportOfAverageGradeBySupplier(supplierByCall.getId(), recordOfReport,
                        parameters);
                response.add(recordOfReport);
            }
        }

        return response;
    }

}
