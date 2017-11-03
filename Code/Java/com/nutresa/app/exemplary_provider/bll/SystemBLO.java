package com.nutresa.app.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Map;

import com.nutresa.app.exemplary_provider.dal.SystemDAO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.app.exemplary_provider.dtl.SystemDTO;


public class SystemBLO {
	private SystemDAO dao;

	public SystemBLO() {
		this.dao = new SystemDAO();
	}
	
	@SuppressWarnings("unchecked")
	public ServletResponseDTO<SystemDTO> get(Map<String, String> parameters) {
		ServletResponseDTO<SystemDTO> response;
		try {
			SystemDTO dto = this.dao.get(parameters.get("id"));
			response = new ServletResponseDTO(true,"sucess",dto);
		}catch (Exception exception) {
			response = new ServletResponseDTO(false,"error");
		}
		return response;
		
	}
	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<SystemDTO>> getAll() {
		ServletResponseDTO<ArrayList<SystemDTO>> response;
		ArrayList<SystemDTO> list = new ArrayList<SystemDTO>();
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
	public ServletResponseDTO<?> save(SystemDTO dto) {
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
	public ServletResponseDTO<?> update(SystemDTO dto) {
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
