package com.nutresa.app.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Map;

import com.nutresa.app.exemplary_provider.dal.NotificationDAO;
import com.nutresa.app.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;


public class NotificationBLO {
    private NotificationDAO dao;

    public NotificationBLO() {
        this.dao = new NotificationDAO();
    }
    
    @SuppressWarnings("unchecked")
    public ServletResponseDTO<NotificationDTO> get(Map<String, String> parameters) {
        ServletResponseDTO<NotificationDTO> response;
        try {
            NotificationDTO dto = this.dao.get(parameters.get("id"));
            response = new ServletResponseDTO(true,"sucess",dto);
        }catch (Exception exception) {
            response = new ServletResponseDTO(false,"error");
        }
        return response;
        
    }
    @SuppressWarnings("unchecked")
    public ServletResponseDTO<ArrayList<NotificationDTO>> getAll() {
        ServletResponseDTO<ArrayList<NotificationDTO>> response;
        ArrayList<NotificationDTO> list = new ArrayList<NotificationDTO>();
        try {
            list = this.dao.getAll();
            response = new ServletResponseDTO(true,"sucess",list);
        } catch (IllegalAccessException exception) {
            exception.printStackTrace();
            response = new ServletResponseDTO(false,"error",list);
        }
        return response;
    }

    @SuppressWarnings("unchecked")
    public ServletResponseDTO<?> save(NotificationDTO dto) {
        ServletResponseDTO<?> response;
        try {
            this.dao.save(dto);
            response = new ServletResponseDTO(true,"sucess");
        } catch (IllegalAccessException exception) {
            exception.printStackTrace();
            response = new ServletResponseDTO(false,"error");
        }
        return response;
    }

    @SuppressWarnings("unchecked")
    public ServletResponseDTO<?> update(NotificationDTO dto) {
        ServletResponseDTO<?> response;
        try {
            this.dao.update(dto,dto.getId());
            response = new ServletResponseDTO(true,"sucess");
        } catch (IllegalAccessException exception) {
            exception.printStackTrace();
            response = new ServletResponseDTO(false,"error");
        }
        return response;
    }
    
    @SuppressWarnings("unchecked")
    public ServletResponseDTO<?> delete(Map<String, String> parameters) {
        ServletResponseDTO<?> response;
        try {
            this.dao.delete(parameters.get("id"));
            response = new ServletResponseDTO(true,"sucess");
        } catch (IllegalAccessException exception) {
            exception.printStackTrace();
            response = new ServletResponseDTO(false,"error");
        }
        return response;
    }

}
