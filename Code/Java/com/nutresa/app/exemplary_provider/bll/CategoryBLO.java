package com.nutresa.app.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Map;

import com.nutresa.app.exemplary_provider.dal.CategoryDAO;
import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;


public class CategoryBLO {
    private CategoryDAO dao;

    public CategoryBLO() {
        this.dao = new CategoryDAO();
    }
    
    @SuppressWarnings("unchecked")
    public ServletResponseDTO<CategoryDTO> get(Map<String, String> parameters) {
        ServletResponseDTO<CategoryDTO> response;
        try {
            CategoryDTO dto = this.dao.get(parameters.get("id"));
            response = new ServletResponseDTO(true,"sucess",dto);
        }catch (Exception exception) {
            response = new ServletResponseDTO(false,"error");
        }
        return response;
    }
    
    @SuppressWarnings("unchecked")
    public ServletResponseDTO<ArrayList<CategoryDTO>> getAll() {
        ServletResponseDTO<ArrayList<CategoryDTO>> response;
        ArrayList<CategoryDTO> list = new ArrayList<CategoryDTO>();
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
    public ServletResponseDTO<?> save(CategoryDTO dto) {
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
    public ServletResponseDTO<?> update(CategoryDTO dto) {
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
