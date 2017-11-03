package com.nutresa.app.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.nutresa.app.exemplary_provider.bll.SystemBLO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.app.exemplary_provider.dtl.SystemDTO;


public class SystemAPI extends GenericAPI<SystemDTO, SystemBLO>{
	
	public SystemAPI(){
		super(SystemDTO.class, SystemBLO.class);
	}
		
	public ServletResponseDTO<?> save(SystemDTO dto) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{		
		SystemBLO blo = new SystemBLO();
		Method method = blo.getClass().getMethod("save", SystemDTO.class);
		return (ServletResponseDTO<?>) method.invoke(blo, dto);
	}
	
	public ServletResponseDTO<?> update(SystemDTO dto) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{
		SystemBLO blo = new SystemBLO();
		Method method = blo.getClass().getMethod("update", SystemDTO.class);
		return (ServletResponseDTO<?>) method.invoke(blo, dto);
	}
	
}
