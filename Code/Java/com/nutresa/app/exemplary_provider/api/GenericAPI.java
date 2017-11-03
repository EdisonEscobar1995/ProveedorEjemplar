package com.nutresa.app.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Map;

import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;


public class GenericAPI<T, B> extends BaseAPI {

	private Class<B> bloClass;
	
	public GenericAPI(Class<T> dtoClass, Class<B> bloClass){
		super(dtoClass);
		this.bloClass = bloClass;
	}
	
	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> get(Map<String, String> parameters) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{	
		B blo = (B)this.bloClass.newInstance();
		Method method = blo.getClass().getMethod("get", Map.class);
		return (ServletResponseDTO<T>) method.invoke(blo, parameters);
	}
	
	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<T>> getAll(Map<String, String> parameters) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{	
		B blo = (B)this.bloClass.newInstance();
		Method method = blo.getClass().getMethod("getAll");
		return (ServletResponseDTO<ArrayList<T>>) method.invoke(blo);
	}
	
	public ServletResponseDTO<?> delete(Map<String, String> parameters) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{
		B blo = (B)this.bloClass.newInstance();
		Method method = blo.getClass().getMethod("delete", Map.class);
		return (ServletResponseDTO<?>) method.invoke(blo, parameters);
	}
}
