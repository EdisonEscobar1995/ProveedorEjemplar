package Nutresa.ExemplaryProvider.BLL;

import java.util.ArrayList;
import java.util.Map;

import Nutresa.ExemplaryProvider.DAL.SystemDAO;
import Nutresa.ExemplaryProvider.DTL.ServletResponseDTO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemBLO {
	private SystemDAO systemDAO;

	public SystemBLO() {
		this.systemDAO = new SystemDAO();
	}
	
	@SuppressWarnings("unchecked")
	public ServletResponseDTO<SystemDTO> get(Map<String, String> param) {
		ServletResponseDTO<SystemDTO> response;
		try {
			SystemDTO dto = this.systemDAO.get(param.get("id"));
			response = new ServletResponseDTO(true,"sucess",dto);
		}catch (Exception e) {
			// TODO: handle exception
			response = new ServletResponseDTO(false,"error");
		}
		return response;
		
	}
	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<SystemDTO>> getAll() {
		ServletResponseDTO<ArrayList<SystemDTO>> response;
		ArrayList<SystemDTO> list = new ArrayList<SystemDTO>();
		try {
			list = this.systemDAO.get();
			response = new ServletResponseDTO(true,"sucess",list);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			response = new ServletResponseDTO(false,"error",list);
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<?> save(SystemDTO dto) {
		ServletResponseDTO<?> response;
		try {
			this.systemDAO.save(dto);
			response = new ServletResponseDTO(true,"sucess");
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			response = new ServletResponseDTO(false,"error");
		}
		return response;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<?> update(SystemDTO dto) {
		ServletResponseDTO<?> response;
		try {
			this.systemDAO.update(dto,dto.getId());
			response = new ServletResponseDTO(true,"sucess");
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			response = new ServletResponseDTO(false,"error");
		}
		return response;
	}
	
	public void delete() {
		try {
			this.systemDAO.delete("Hola");
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}

}
