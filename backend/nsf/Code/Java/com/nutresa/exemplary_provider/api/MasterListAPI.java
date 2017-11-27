package com.nutresa.exemplary_provider.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.MasterListBLO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;


@SuppressWarnings("unchecked")
public class MasterListAPI extends BaseAPI {

    public MasterListAPI() {
        super(MasterListBLO.class);
    }

    public ServletResponseDTO<Map<String, List<DTO>>> get(Map<String, String> parameters) {
        ServletResponseDTO<Map<String, List<DTO>>> response = null;
        try {
            Map<String, List<DTO>> masters;
            if (parameters.size() > 0) {
                MasterListBLO masterListBLO = new MasterListBLO();
                masters = masterListBLO.get(parameters);
            } else {
                masters = new HashMap<String, List<DTO>>();
            }
            response = new ServletResponseDTO<Map<String, List<DTO>>>(masters);
        } catch (Exception exception) {
            response = new ServletResponseDTO<Map<String, List<DTO>>>(exception);
        }

        return response;
    }
 
}
