package com.nutresa.app.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nutresa.app.exemplary_provider.dal.SystemDAO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.app.exemplary_provider.dtl.SystemDTO;

public class SystemBLO<T> {
	private SystemDAO dao;
	private static final String SUCCESS = "success";

	public SystemBLO() {
		this.dao = new SystemDAO();
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<SystemDTO> get(Map<String, String> parameters) {
		ServletResponseDTO<SystemDTO> response;
		try {
			SystemDTO dto = this.dao.get(parameters.get("id"));
			response = new ServletResponseDTO(true, SUCCESS, dto);
		} catch (Exception exception) {
			return new ServletResponseDTO(false, exception);
		}
		return response;

	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<SystemDTO>> getAll() {
		ServletResponseDTO<ArrayList<SystemDTO>> response;
		List<SystemDTO> list = new ArrayList<SystemDTO>();
		try {
			list = this.dao.getAll();
			response = new ServletResponseDTO(true, SUCCESS, list);
		} catch (IllegalAccessException exception) {
			return new ServletResponseDTO(false, exception, list);
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> save(SystemDTO dto) {
		ServletResponseDTO<T> response;
		try {
			this.dao.save(dto);
			response = new ServletResponseDTO(true, SUCCESS);
		} catch (IllegalAccessException exception) {
			return new ServletResponseDTO(false, exception);
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> update(SystemDTO dto) {
		ServletResponseDTO<T> response;
		try {
			this.dao.update(dto, dto.getId());
			response = new ServletResponseDTO(true, SUCCESS);
		} catch (IllegalAccessException exception) {
			return new ServletResponseDTO(false, exception);
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> delete(Map<String, String> parameters) {
		ServletResponseDTO<T> response;
		try {
			this.dao.delete(parameters.get("id"));
			response = new ServletResponseDTO(true, SUCCESS);
		} catch (IllegalAccessException exception) {
			return new ServletResponseDTO(false, exception);
		}
		return response;
	}

}