package com.nutresa.app.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.nutresa.app.exemplary_provider.bll.SystemBLO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.app.exemplary_provider.dtl.SystemDTO;

@SuppressWarnings("unchecked")
public class SystemAPI<T> extends GenericAPI<SystemDTO, SystemBLO> {

	public SystemAPI() {
		super(SystemDTO.class, SystemBLO.class);
	}

	public ServletResponseDTO<T> save(SystemDTO dto)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		SystemBLO blo = new SystemBLO();
		Method method = blo.getClass().getMethod("save", SystemDTO.class);
		return (ServletResponseDTO<T>) method.invoke(blo, dto);
	}

	public ServletResponseDTO<T> update(SystemDTO dto)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		SystemBLO blo = new SystemBLO();
		Method method = blo.getClass().getMethod("update", SystemDTO.class);
		return (ServletResponseDTO<T>) method.invoke(blo, dto);
	}

}
