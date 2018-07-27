package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.MenuDAO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.MenuDTO;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class MenuBLO extends GenericBLO<MenuDTO, MenuDAO> {

    public MenuBLO() {
        super(MenuDAO.class);
    }

    public List<DTO> getMenusByRol() throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        MenuBLO menuBLO = new MenuBLO();
        List<DTO> rols = userBLO.getRolsByUser();
        List<DTO> listMenusByRol = new ArrayList<DTO>();
        if (null != rols && !rols.isEmpty()) {
            Map<String, List<Object>> list = Common.getDtoFields(rols, new String[] { "[id]" }, RolDTO.class);
            listMenusByRol = menuBLO.getAllBy("idsRol", Common.getIdsFromList(list.get("[id]")));
        }
        return listMenusByRol;
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("title");
        fields.add("categoryName");
        entityWithFields.put("Menu", fields);
        return entityWithFields;
    }
}
