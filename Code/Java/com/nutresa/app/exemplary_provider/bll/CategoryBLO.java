package com.nutresa.app.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.openntf.domino.utils.DominoUtils;

import com.nutresa.app.exemplary_provider.dal.CategoryDAO;
import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;

public class CategoryBLO<T> {
	private CategoryDAO dao;
	private static final String SUCCESS = "success";

	public CategoryBLO() {
		this.dao = new CategoryDAO();
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<CategoryDTO> get(Map<String, String> parameters) {
		ServletResponseDTO<CategoryDTO> response;
		try {
			CategoryDTO dto = this.dao.get(parameters.get("id"));
			response = new ServletResponseDTO(true, SUCCESS, dto);
		} catch (Exception exception) {
			DominoUtils.handleException(new Throwable(exception));
			response = new ServletResponseDTO(false, exception.getMessage());
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<CategoryDTO>> getAll() {
		ServletResponseDTO<ArrayList<CategoryDTO>> response;
		List<CategoryDTO> list = new ArrayList<CategoryDTO>();
		try {
			list = this.dao.getAll();
			response = new ServletResponseDTO(true, SUCCESS, list);
		} catch (IllegalAccessException exception) {
			DominoUtils.handleException(new Throwable(exception));
			response = new ServletResponseDTO(false, exception.getMessage(),
					list);
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> save(CategoryDTO dto) {
		ServletResponseDTO<T> response;
		try {
			this.dao.save(dto);
			response = new ServletResponseDTO(true, SUCCESS);
		} catch (IllegalAccessException exception) {
			DominoUtils.handleException(new Throwable(exception));
			response = new ServletResponseDTO(false, exception.getMessage());
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> update(CategoryDTO dto) {
		ServletResponseDTO<T> response;
		try {
			this.dao.update(dto, dto.getId());
			response = new ServletResponseDTO(true, SUCCESS);
		} catch (IllegalAccessException exception) {
			DominoUtils.handleException(new Throwable(exception));
			response = new ServletResponseDTO(false, exception.getMessage());
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
			DominoUtils.handleException(new Throwable(exception));
			response = new ServletResponseDTO(false, exception.getMessage());
		}
		return response;
	}
}
