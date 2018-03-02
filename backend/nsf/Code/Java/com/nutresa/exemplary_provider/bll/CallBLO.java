package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.CallDAO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.NotificationType;
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
            notification.sendNotificationTypeToSupplier(supplier, NotificationType.SUPPLIER_CALLED_BY_LIBERATOR);
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
            if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())) {
                response = supplierBLO.getSummaryWithSurvey(year);
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
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
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return Collección de datos obtenidos según los parámetros
     *         <code>parameters</code>
     * @throws HandlerGenericException
     *             Con mensaje <code>CALL_NOT_ESPECIFIED</code> si no se envía
     *             el identificador de la convocatoria en los parámetros de
     *             búsqueda. Con mensaje <code>INFORMATION_NOT_FOUND</code> si
     *             no se encontró información para exportar. Con mensaje
     *             <code>ROL_INVALID</code> si el usuario en sesión no tiene el
     *             rol permitido.
     */
    public List<ReportOfAverageGradeBySuppliers> getReportOfAverageGradeBySupplier(Map<String, String> parameters)
            throws HandlerGenericException {
        List<ReportOfAverageGradeBySuppliers> response = new ArrayList<ReportOfAverageGradeBySuppliers>();

        UserBLO userBLO = new UserBLO();
        if (userBLO.isRol(Rol.LIBERATOR.toString()) || userBLO.isRol(Rol.ADMINISTRATOR.toString())
                || userBLO.isRol(Rol.EVALUATOR.toString())) {
            String idCall = parameters.get("call");
            if (null != idCall && !idCall.isEmpty()) {
                SupplierBLO supplierBLO = new SupplierBLO();
                List<SupplierDTO> suppliers = supplierBLO.getThemByIdCallOrFiltered(idCall, parameters);
                if (!suppliers.isEmpty()) {
                    response = buildReportOfAverageGradeBySupplier(idCall, suppliers, parameters);
                }
            } else {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.CALL_NOT_ESPECIFIED.toString());
            }

            if (response.isEmpty()) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
        }

        return response;
    }

    /**
     * @param idCall
     *            Identificador de la convocatoria que se va consultar.
     * @param suppliers
     *            Collección de proveedores
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return Collección de registros del reporte
     * @throws HandlerGenericException
     */
    private List<ReportOfAverageGradeBySuppliers> buildReportOfAverageGradeBySupplier(String idCall,
            List<SupplierDTO> suppliers, Map<String, String> parameters) throws HandlerGenericException {
        List<ReportOfAverageGradeBySuppliers> response = new ArrayList<ReportOfAverageGradeBySuppliers>();
        for (SupplierDTO supplier : suppliers) {
            SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
            SupplierByCallDTO supplierByCall = supplierByCallBLO.getByIdCallAndIdSupplierFinished(idCall, supplier
                    .getId());
            if (supplierByCall instanceof SupplierByCallDTO) {
                response.add(getRecordOfReport(supplierByCall, supplier, parameters));
            }
        }

        return response;
    }

    private ReportOfAverageGradeBySuppliers getRecordOfReport(SupplierByCallDTO supplierByCall, SupplierDTO supplier,
            Map<String, String> parameters) throws HandlerGenericException {
        ReportOfAverageGradeBySuppliers recordOfReport = new ReportOfAverageGradeBySuppliers();
        AnswerBLO answerBLO = new AnswerBLO();
        SupplyBLO supplyBLO = new SupplyBLO();
        CategoryBLO categoryBLO = new CategoryBLO();
        CompanySizeBLO companySizeBLO = new CompanySizeBLO();
        recordOfReport.setNit(supplier.getNit());
        recordOfReport.setSapCode(supplier.getSapCode());
        recordOfReport.setName(supplier.getBusinessName());
        recordOfReport.setSupply(supplyBLO.get(supplier.getIdSupply()).getName());
        recordOfReport.setCategory(categoryBLO.get(supplier.getIdCategory()).getName());
        recordOfReport.setCompanySize(companySizeBLO.get(supplier.getIdCompanySize()).getName());
        recordOfReport.setIdSupplier(supplierByCall.getIdSupplier());
        recordOfReport.setIdSupplierByCall(supplierByCall.getId());
        recordOfReport = answerBLO.buildReportOfAverageGradeBySupplier(supplierByCall.getId(), recordOfReport,
                parameters);

        return recordOfReport;
    }

    public List<ReportOfAverageGradeBySuppliers> getThemWillPassToTechnicalTeam() throws HandlerGenericException {
        SupplierBLO supplierBLO = new SupplierBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        List<SupplierByCallDTO> evaluated = supplierByCallBLO.getFinishedByEvaluator();
        List<ReportOfAverageGradeBySuppliers> response = new ArrayList<ReportOfAverageGradeBySuppliers>();
        for (SupplierByCallDTO supplierByCall : evaluated) {
            response.add(getRecordOfReport(supplierByCall, supplierBLO.get(supplierByCall.getIdSupplier()),
                    new HashMap<String, String>()));
        }

        if (response.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        return response;
    }

}
