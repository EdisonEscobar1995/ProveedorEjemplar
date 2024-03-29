package com.nutresa.exemplary_provider.dal;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.View;
import org.openntf.domino.ViewEntry;
import org.openntf.domino.ViewEntryCollection;

import com.nutresa.exemplary_provider.dtl.FieldsSupplier;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierDAO extends GenericDAO<SupplierDTO> {
    private static final short MAX_RESULTS = 20;

    public SupplierDAO() {
        super(SupplierDTO.class);
    }

    public SupplierDTO getSupplierByFullName(String idSupplier) throws HandlerGenericException {
        SupplierDTO supplier = null;
        String fullName = "";
        try {
            if (null != idSupplier) {
                fullName = super.get(idSupplier).getFullName();
            } else {
                fullName = getNameUserInSession();
            }

            View view = getDatabase().getView("vwSuppliersByFullName");
            Document document = view.getFirstDocumentByKey(fullName, true);
            if (null != document) {
                supplier = castDocument(document);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return supplier;
    }

    public Map<String, String> getInformationInOtherDataBase(SupplierDTO supplier) throws HandlerGenericException {
        Map<String, String> response = new HashMap<String, String>();
        try {
            View vwSystem = getDatabase().getView("vwSystems");
            Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
            Database namesDatabase = getSession().getDatabase(docSystem.getItemValueString("namesPathApplication"));
            View vwNames = namesDatabase.getView("($Users)");
            Document docNames = vwNames.getFirstDocumentByKey(supplier.getFullName(), true);

            if (null != docNames) {
                response.put("password", docNames.getItemValueString("Comment"));
                response.put("userName", docNames.getItemValueString("shortName"));
            }

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    @Override
    public List<SupplierDTO> getAllBy(String field, String value) throws HandlerGenericException {
        List<SupplierDTO> suppliers = super.getAllBy(field, value);
        CustomerDAO customerDAO = new CustomerDAO();
        ContactDAO contactDAO = new ContactDAO();
        int index = 0;
        for (SupplierDTO supplier : suppliers) {
            supplier.setPrincipalCustomer(customerDAO.getCustomersBySupplier(supplier.getId()));
            supplier.setContactNutresaGroup(contactDAO.getContactsBySupplier(supplier.getId()));
            suppliers.set(index, supplier);
            index = index + 1;
        }

        return suppliers;
    }

    /**
     * Dada la información en <code>parameters</code> identifica por cuales
     * campos e deben filtrar los proveedores.
     * 
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return Mapa clave valor con los campos que se debe filtrar.
     * @throws HandlerGenericException
     */
    public Map<String, String> identifyFieldsToFTSearch(Map<String, String> parameters) throws HandlerGenericException {
        Map<String, String> fields = new HashMap<String, String>();
        for (FieldsSupplier field : FieldsSupplier.values()) {
            if (parameters.containsKey(field.getFieldName())) {
                String valueInField = parameters.get(field.getFieldName());
                if (null != valueInField && !valueInField.trim().isEmpty()) {
                    Common.setFieldsToFilterFTSearch(valueInField, field.getFieldName(), fields);
                }
            }
        }

        return fields;
    }

    /**
     * Filtra los proveedores según los campos especificados en
     * code>fieldsToFilter</code>
     * 
     * @param fieldsToFilter
     *            Mapa clave valor de los campos por los cuales se filtrarán los
     *            proveedores.
     * @return Colección de proveedores.
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> getThemWithFilter(Map<String, String> fieldsToFilter) throws HandlerGenericException {
        List<SupplierDTO> response = new ArrayList<SupplierDTO>();
        try {
            View view = getDatabase().getView("vwSuppliers");
            view.FTSearch(buildCharFTSearch(fieldsToFilter, SupplierDTO.class), 0);

            ViewEntryCollection entries = view.getAllEntries();
            if (null != entries) {
                for (ViewEntry entry : entries) {
                    Document document = entry.getDocument();
                    response.add(castDocument(document));
                }
                view.clear();
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    /**
     * @param nit
     * @return <code>true</code> si existe un registro en el directorio general
     *         con dicho <code>nit</code>, de lo contrario <code>false</code>
     * @throws HandlerGenericException
     */
    public boolean existInGeneralDirectoryByNit(String nit) throws HandlerGenericException {
        try {
            boolean existInGeneralDirectory = false;
            View vwSystem = getDatabase().getView("vwSystems");
            Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
            Database namesDatabase = getSession().getDatabase(docSystem.getItemValueString("namesPathApplication"));
            View vwNames = namesDatabase.getView("PeopleXcedula");
            Document docNames = vwNames.getFirstDocumentByKey(nit, true);

            if (null != docNames) {
                String employeeId = docNames.getItemValueString("EmployeeID");
                if (null != employeeId && !employeeId.isEmpty()) {
                    existInGeneralDirectory = true;
                }
            }

            return existInGeneralDirectory;
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    /**
     * Busca los proveedores que contengan <code>text</code> en el campo código
     * sap
     * 
     * @param text
     *            valor a buscar en los documentos
     * @return Colección de proveedores que coinciden con el valor a buscar
     * @throws HandlerGenericException
     */
    public List<SupplierDTO> searchSupplier(String text) throws HandlerGenericException {
        List<SupplierDTO> suppliers = new ArrayList<SupplierDTO>();
        View vwSystem = getDatabase().getView("vwSystems");
        Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
        Database namesDatabase = getSession().getDatabase(docSystem.getItemValueString("supplierPathApplication"));
        View vwNames = namesDatabase.getView("dnvwFVSociedadCodigoProv");
        String query = "(Field dnfdCodigo1 = *".concat(text.concat("*)"));
        if (null != vwNames) {
            vwNames.FTSearch(query, MAX_RESULTS);
            Document document = vwNames.getFirstDocument();
            while (document != null) {
                SupplierDTO supplier = new SupplierDTO();
                String sapCode = document.getItemValueString("dnfdCodigo");
                String businessName = document.getItemValueString("dnfdNombre");
                String nit = document.getItemValueString("dnfdNit");

                supplier.setSapCode(sapCode);
                supplier.setBusinessName(businessName);
                supplier.setNit(nit);
                suppliers.add(supplier);
                document = vwNames.getNextDocument(document);
            }
            vwNames.clear();
        }

        return suppliers;
    }

    /**
     * @param sapCode
     * @param nit
     * @return Proveedor existente
     * @throws HandlerGenericException
     */
    public SupplierDTO getBySAPCodeOrNIT(String sapCode, String nit) throws HandlerGenericException {
        try {
            SupplierDTO supplier = null;
            View viewSap = null;
            Document documentSap = null;
            View viewNit = null;
            Document documentNit = null;
            if (null != sapCode && !sapCode.isEmpty()) {
                viewSap = getDatabase().getView("vwSuppliersBySapCode");
                documentSap = viewSap.getFirstDocumentByKey(sapCode, true);
            }

            if (null != nit && !nit.isEmpty()) {
                viewNit = getDatabase().getView("vwSupplierByNit");
                documentNit = viewNit.getFirstDocumentByKey(nit, true);
            }

            if (null != documentSap) {
                supplier = castDocument(documentSap);
            }

            if (null != documentNit) {
                supplier = castDocument(documentNit);
            }

            return supplier;
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

    }

}
