package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

public class SupplierByCallDAO extends GenericDAO<SupplierByCallDTO> {
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
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return callsBySupplier;
    }

    public List<SupplierDTO> getSuppliersByCallDontInvited(String idCall) throws HandlerGenericException {
        List<SupplierDTO> suppliers = new ArrayList<SupplierDTO>();
        SupplierByCallDTO supplierByCallDTO = null;
        SupplierDAO supplierDAO = new SupplierDAO();
        try {
            View currentView = getDatabase().getView("vwSuppliersByCallIdCall");
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
     * @param idCall Identificador de la convocatoria.
     * @return Colección de proveedores.
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> getSuppliersByCall(String idCall) throws HandlerGenericException {
        List<SupplierDTO> suppliers = new ArrayList<SupplierDTO>();
        SupplierByCallDTO supplierByCallDTO = null;
        SupplierDAO supplierDAO = new SupplierDAO();
        try {
            View currentView = getDatabase().getView("vwSuppliersByCallIdCall");
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
     * Buscar la convocatoria de un proveedor en caso de estar finalizada. La búsqueda debe coincidir justo con
     * los parámetros <code>idCall</code> y <code>idSupplier</code>
     * 
     * @param idCall Identificador de la convocatoria
     * @param idSupplier Identificador del proveedor
     * @return Objeto con la información en caso de hallar considencia en la búsqueda.
     * @throws HandlerGenericException
     */
    public SupplierByCallDTO getByIdCallAndIdSupplierFinished(String idCall, String idSupplier)
            throws HandlerGenericException {
        SupplierByCallDTO response = null;

        for (SurveyStates stateName : SurveyStates.values()) {
            if (!stateName.equals(SurveyStates.DONT_PARTICIPATE) && !stateName.equals(SurveyStates.NOT_STARTED)
                    && !stateName.equals(SurveyStates.SUPPLIER)) {
                StateDAO stateDAO = new StateDAO();
                String idState = stateDAO.getStateByShortName(stateName.toString()).getId();
                List<String> filter = new ArrayList<String>();
                
                if(null != idState){
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

}
