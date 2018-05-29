package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.SystemBLO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SystemDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SystemAPI extends GenericAPI<SystemDTO, SystemBLO> {

    public SystemAPI() {
        super(SystemDTO.class, SystemBLO.class);
    }

    public ServletResponseDTO<SystemDTO> getConfiguration() {
        ServletResponseDTO<SystemDTO> response = null;
        SystemBLO systemBLO = new SystemBLO();
        try {
            response = new ServletResponseDTO<SystemDTO>(systemBLO.getConfiguration());
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SystemDTO>(exception);
        }

        return response;
    }

    @Override
    public ServletResponseDTO<SystemDTO> delete(Map<String, String> parameters) {
        return new ServletResponseDTO<SystemDTO>(new HandlerGenericException(
                HandlerGenericExceptionTypes.UNABLED_REQUEST.toString()));
    }

    @Override
    public ServletResponseDTO<SystemDTO> get(Map<String, String> parameters) {
        return new ServletResponseDTO<SystemDTO>(new HandlerGenericException(
                HandlerGenericExceptionTypes.UNABLED_REQUEST.toString()));
    }

    @Override
    public ServletResponseDTO<List<SystemDTO>> getAll(Map<String, String> parameters) {
        return new ServletResponseDTO<List<SystemDTO>>(new HandlerGenericException(
                HandlerGenericExceptionTypes.UNABLED_REQUEST.toString()));
    }

}