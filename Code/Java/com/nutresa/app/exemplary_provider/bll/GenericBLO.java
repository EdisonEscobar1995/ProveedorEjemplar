package com.nutresa.app.exemplary_provider.bll;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.app.exemplary_provider.utils.Common;

public class GenericBLO<T, D> {

	private Class<D> daoClass;
	private static final String SUCCESS = "success";

	public GenericBLO(Class<D> daoClass) {
		this.daoClass = daoClass;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> get(Map<String, String> parameters) {
		try {
			D dao = this.daoClass.newInstance();
			Method method = dao.getClass().getMethod("get", String.class);
			T dto = (T) method.invoke(dao, parameters.get("id"));
			return new ServletResponseDTO(true, SUCCESS, dto);
		} catch (Exception exception) {
			return new ServletResponseDTO(false, exception);
		}
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<T>> getAll() {
		List<T> list = new ArrayList<T>();
		try {
			D dao = this.daoClass.newInstance();
			Method method = dao.getClass().getMethod("getAll");
			list = (List<T>) method.invoke(dao);
			return new ServletResponseDTO(true, SUCCESS, list);
		} catch (Exception exception) {
			return new ServletResponseDTO(false, exception, list);
		}
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> save(T dto) {
		try {
			Field field = Common.getField(dto.getClass(), "id");
			String id = (String) field.get(dto);
			field = Common.getField(dto.getClass(), "form");
			String form = (String) field.get(dto);
			Method method;
			D dao = this.daoClass.newInstance();
			if ("".equals(id)) {
				if ("frSystem".equals(form)) {
					method = Common.getMethod(this.daoClass, "saveProfile");
					method.invoke(dao, form, dto);
				} else {
					method = Common.getMethod(this.daoClass, "save");
					method.invoke(dao, dto);
				}
			} else {
				method = Common.getMethod(this.daoClass, "update");
				method.invoke(dao, id, dto);
			}
			return new ServletResponseDTO(true, SUCCESS);
		} catch (Exception exception) {
			return new ServletResponseDTO(false, exception);
		}
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> delete(Map<String, String> parameters) {
		try {
			D dao = daoClass.newInstance();
			Method method = dao.getClass().getMethod("delete", String.class);
			method.invoke(dao, parameters.get("id"));
			return new ServletResponseDTO(true, SUCCESS);
		} catch (Exception exception) {
			return new ServletResponseDTO(false, exception);
		}
	}

}
