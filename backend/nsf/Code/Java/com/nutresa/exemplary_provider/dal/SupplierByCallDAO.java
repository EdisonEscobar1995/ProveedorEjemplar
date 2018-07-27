package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

public class SupplierByCallDAO extends GenericDAO<SupplierByCallDTO> {

    private static final String VIEW_SUPPLIER_BY_CALL_AND_ID_CALL = "vwSuppliersByCallIdCall";

    public SupplierByCallDAO() {
        super(SupplierByCallDTO.class);
        this.entityView = "vwSuppliersByCall";
    }

    public List<SupplierByCallDTO> getCallsBySupplier(String idSupplier) throws HandlerGenericException {
        List<SupplierByCallDTO> callsBySupplier = new ArrayList<SupplierByCallDTO>();
        try {
            View currentView = getDatabase().getView("vwSuppliersByCallSupplier");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idSupplier, true);
            for (Document document : documents) {
                callsBySupplier.add(castDocument(document));
            }
            return callsBySupplier;
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public List<SupplierDTO> getSuppliersByCallDontInvited(String idCall) throws HandlerGenericException {
        List<SupplierDTO> suppliers = new ArrayList<SupplierDTO>();
        SupplierByCallDTO supplierByCallDTO = null;
        SupplierDAO supplierDAO = new SupplierDAO();
        try {
            View currentView = getDatabase().getView(VIEW_SUPPLIER_BY_CALL_AND_ID_CALL);
            List<String> filter = new ArrayList<String>();
            filter.add(idCall);
            filter.add("0");
            DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
            for (Document document : documents) {
                supplierByCallDTO = castDocument(document);
                SupplierDTO supplier = supplierDAO.get(supplierByCallDTO.getIdSupplier());
                if (null != supplier && null != supplier.getId()) {
                    suppliers.add(supplier);
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return suppliers;
    }

    /**
     * Obtiene los proveedores asociados a una convocatoria.
     * 
     * @param idCall
     *            Identificador de la convocatoria.
     * @return Colección de proveedores.
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> getSuppliersByCall(String idCall) throws HandlerGenericException {
        List<SupplierDTO> suppliers = new ArrayList<SupplierDTO>();
        SupplierByCallDTO supplierByCallDTO = null;
        SupplierDAO supplierDAO = new SupplierDAO();
        try {
            View currentView = getDatabase().getView(VIEW_SUPPLIER_BY_CALL_AND_ID_CALL);
            DocumentCollection documents = currentView.getAllDocumentsByKey(idCall, true);
            for (Document document : documents) {
                supplierByCallDTO = castDocument(document);
                SupplierDTO supplier = supplierDAO.get(supplierByCallDTO.getIdSupplier());
                if (null != supplier && null != supplier.getId()) {
                    suppliers.add(supplier);
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return suppliers;
    }

    /**
     * Buscar la convocatoria de un proveedor en caso de estar finalizada. La
     * búsqueda debe coincidir justo con los parámetros <code>idCall</code> y
     * <code>idSupplier</code>
     * 
     * @param idCall
     *            Identificador de la convocatoria
     * @param idSupplier
     *            Identificador del proveedor
     * @return Objeto con la información en caso de hallar considencia en la
     *         búsqueda.
     * @throws HandlerGenericException
     */
    public SupplierByCallDTO getByIdCallAndIdSupplierFinished(String idCall, String idSupplier,
            List<SurveyStates> surveyStatesAllowed) throws HandlerGenericException {
        SupplierByCallDTO response = null;

        for (SurveyStates stateName : SurveyStates.values()) {
            if (surveyStatesAllowed.contains(stateName)) {
                StateDAO stateDAO = new StateDAO();
                String idState = stateDAO.getStateByShortName(stateName.toString()).getId();
                List<String> filter = new ArrayList<String>();

                if (null != idState) {
                    filter.add(idSupplier);
                    filter.add(idCall);
                    filter.add(idState);
                } else {
                    continue;
                }

                View view = getDatabase().getView("vwSuppliersByCallInIdSupplierAndIdCallFinished");
                Document document = view.getFirstDocumentByKey(filter, true);
                if (null != document) {
                    response = castDocument(document);
                }
            }
        }

        return response;
    }

    /**
     * Obtiene las convocatorias por proveedor. Solo aquellas que concidan por
     * cada uno de los estados especificados
     * 
     * @param idCall
     *            Identificador de la convocatoria
     * @param states
     *            Colección con los estados a filtrar.
     * @return Colección de datos encontrados
     * @throws HandlerGenericException
     */
    @SuppressWarnings("unchecked")
    public List<DTO> getByStates(String idCall, List<String> states) throws HandlerGenericException {
        try {
            List<DTO> response = null;
            int index = 0;
            StateDAO stateDAO = new StateDAO();
            for (String state : states) {
                states.set(index, "[idState] = ".concat(stateDAO.getStateByShortName(state).getId()));
                index = index + 1;
            }

            String queryFTSearch = "[idCall] = " + idCall + " AND (" + Common.implodeList(" OR ", states) + ")";
            String viewName = VIEW_SUPPLIER_BY_CALL_AND_ID_CALL;
            View view = getDatabase().getView(viewName);
            view.FTSearch(queryFTSearch, 0);

            Map<String, String> filter = new HashMap<String, String>();
            filter.put("idCall", idCall);

            viewFiltered.put(viewName, view);
            entityView = viewName;
            response = ((GenericDAO) this).getAll();
            viewFiltered.remove(viewName);
            return response;
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public List<SupplierByCallDTO> getByStateInCall(String idState, String idCall) throws HandlerGenericException {
        List<SupplierByCallDTO> result;
        List<String> filter = new ArrayList<String>();
        filter.add(idState);
        filter.add(idCall);
        View view = getDatabase().getView("vwSuppliersByCallIdStateAndIdCall");
        DocumentCollection documents = view.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            result = new ArrayList<SupplierByCallDTO>();
            for (Document document : documents) {
                result.add(castDocument(document));
            }
        } else {
            result = new ArrayList<SupplierByCallDTO>();
        }

        return result;
    }

    public List<SupplierByCallDTO> getAllByStates(String idCall, List<SurveyStates> states)
            throws HandlerGenericException {
        List<SupplierByCallDTO> result = new ArrayList<SupplierByCallDTO>();
        for (SurveyStates state : states) {
            StateDAO stateDAO = new StateDAO();
            String idState = stateDAO.getStateByShortName(state.toString()).getId();
            List<String> filter = new ArrayList<String>();
            filter.add(idState);
            filter.add(idCall);

            View currentView = getDatabase().getView("vwSuppliersByCallIdStateAndIdCall");
            DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
            if (null != documents) {
                for (Document document : documents) {
                    result.add(castDocument(document));
                }
            }
        }

        return result;
    }

    /**
     * Elimina todos los documentos donde se coincida con el
     * <code>idSupplierByCall</code>
     * 
     * @param idSupplierByCall
     * @return <code>true</code> en caso de eliminar exitosamente los
     *         documentos, de lo contrario <code>false</code>
     * @throws HandlerGenericException
     */
    public boolean deleteAllReference(String idSupplierByCall) throws HandlerGenericException {
        boolean stateDeleted = false;
        View view = getDatabase().getView("vwUniverse");
        if (view.FTSearch(idSupplierByCall.concat(" AND NOT [form] = frSupplierByCall")) > 0) {
            view.getAllEntries().removeAll(true);
            stateDeleted = true;
        }
        view.clear();
        return stateDeleted;

    }

    /**
     * Verifica si existen proveedores sin haber aceptado su cambio de tamaño de
     * empresa
     * 
     * @param idCall
     *            Identificador de la convocatoria a consultar
     * @return <code>true</code> si existen proveedores, de lo contrario
     *         <code>false</code>
     * @throws HandlerGenericException
     */
    public boolean existSuppliersInCompanySizeChanged(String idCall) throws HandlerGenericException {
        try {
            boolean exist = false;
            View currentView = getDatabase().getView("vwSuppliersByCallModifiedIdCall");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idCall, true);
            if (documents.getCount() > 0) {
                exist = true;
            }
            return exist;
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }
}
