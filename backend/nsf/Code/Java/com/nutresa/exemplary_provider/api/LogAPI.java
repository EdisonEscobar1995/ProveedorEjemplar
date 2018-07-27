package com.nutresa.exemplary_provider.api;

import java.util.Map;

import com.nutresa.exemplary_provider.bll.LogBLO;
import com.nutresa.exemplary_provider.dtl.LogDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;

public class LogAPI extends GenericAPI<LogDTO, LogBLO> {
    public LogAPI() {
        super(LogDTO.class, LogBLO.class);
        dateFomat = "yyyy/MM/dd HH:mm:ss";
    }

    @Override
    public ServletResponseDTO<LogDTO> delete(Map<String, String> parameters) {
        return null;
    }

    @Override
    public ServletResponseDTO<LogDTO> save(LogDTO dto) {
        return null;
    }

}
