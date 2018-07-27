package com.nutresa.exemplary_provider.api;

import java.util.List;

import com.nutresa.exemplary_provider.bll.MenuBLO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.MenuDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class MenuAPI extends GenericAPI<MenuDTO, MenuBLO> {

    public MenuAPI() {
        super(MenuDTO.class, MenuBLO.class);
    }

    public ServletResponseDTO<List<DTO>> getMenusByRol() throws HandlerGenericException {
        MenuBLO menuBLO = new MenuBLO();
        return new ServletResponseDTO<List<DTO>>(menuBLO.getMenusByRol());
    }
}