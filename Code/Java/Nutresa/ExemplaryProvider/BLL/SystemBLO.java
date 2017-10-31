package Nutresa.ExemplaryProvider.BLL;

import java.util.ArrayList;

import Nutresa.ExemplaryProvider.DAL.SystemDAO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemBLO {
	private SystemDAO systemDAO;

	public SystemBLO() {
		this.systemDAO = new SystemDAO();
	}
	
	public SystemDTO get() {
		return this.systemDAO.get("1234");
	}
	public ArrayList<SystemDTO> getAll() {
		ArrayList<SystemDTO> list = new ArrayList<SystemDTO>();
		try {
			list = this.systemDAO.get();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return list;
	}

	public void save() {
		try {
			SystemDTO system = new SystemDTO();
			system.setHost("Hola");
			system.setId("Hola");
			system.setImage("Hola");
			system.setInformationProgram("Hola");
			system.setInputPool("Hola");
			system.setMessageByChangeSizeCompany("Hola");
			system.setRotationTime(3);
			system.setTitle("TItle");
			this.systemDAO.save(system);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}

	public void update() {
		try {
			SystemDTO system = new SystemDTO();
			system.setHost("Hola");
			system.setId("1234");
			system.setImage("Hola");
			system.setInformationProgram("Hola");
			system.setInputPool("Hola");
			system.setMessageByChangeSizeCompany("Hola");
			system.setRotationTime(3);
			system.setTitle("TItle");
			this.systemDAO.update(system,"1234");
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}
	
	public void delete() {
		try {
			this.systemDAO.delete("Hola");
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}

}
