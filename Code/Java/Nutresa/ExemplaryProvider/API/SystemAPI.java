package Nutresa.ExemplaryProvider.API;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import Nutresa.ExemplaryProvider.BLL.SystemBLO;
import Nutresa.ExemplaryProvider.DTL.ServletResponseDTO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

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
