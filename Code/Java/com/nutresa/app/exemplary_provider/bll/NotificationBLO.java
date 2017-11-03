package com.nutresa.app.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.openntf.domino.utils.DominoUtils;

import com.nutresa.app.exemplary_provider.dal.NotificationDAO;
import com.nutresa.app.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;

public class NotificationBLO<T> {
	private NotificationDAO dao;
	private static final String SUCCESS = "success";

	public NotificationBLO() {
		this.dao = new NotificationDAO();
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<NotificationDTO> get(
			Map<String, String> parameters) {
		ServletResponseDTO<NotificationDTO> response;
		try {
			NotificationDTO dto = this.dao.get(parameters.get("id"));
			response = new ServletResponseDTO(true, SUCCESS, dto);
		} catch (Exception exception) {
			DominoUtils.handleException(new Throwable(exception));
			response = new ServletResponseDTO(false, exception.getMessage());
		}
		return response;

	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<NotificationDTO>> getAll() {
		ServletResponseDTO<ArrayList<NotificationDTO>> response;
		List<NotificationDTO> list = new ArrayList<NotificationDTO>();
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
	public ServletResponseDTO<T> save(NotificationDTO dto) {
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
	public ServletResponseDTO<T> update(NotificationDTO dto) {
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
