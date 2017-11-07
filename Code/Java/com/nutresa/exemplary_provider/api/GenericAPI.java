package com.nutresa.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Map;

import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.Common;

public class GenericAPI<T, B> extends BaseAPI<T> {

	private Class<B> bloClass;

	public GenericAPI(Class<T> dtoClass, Class<B> bloClass) {
		super(dtoClass);
		this.bloClass = bloClass;
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> get(Map<String, String> parameters)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		B blo = this.bloClass.newInstance();
		Method method = blo.getClass().getMethod("get", Map.class);
		return (ServletResponseDTO<T>) method.invoke(blo, parameters);
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<ArrayList<T>> getAll(
			Map<String, String> parameters) throws NoSuchMethodException,
			IllegalAccessException, InvocationTargetException,
			InstantiationException {
		B blo = this.bloClass.newInstance();
		Method method = blo.getClass().getMethod("getAll");
		return (ServletResponseDTO<ArrayList<T>>) method.invoke(blo);
	}

	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> save(T dto)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		B blo = this.bloClass.newInstance();
		Method method = Common.getMethod(this.bloClass, "save");
		return (ServletResponseDTO<T>) method.invoke(blo, dto);
	}
	
	@SuppressWarnings("unchecked")
	public ServletResponseDTO<T> delete(Map<String, String> parameters)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		B blo = this.bloClass.newInstance();
		Method method = blo.getClass().getMethod("delete", Map.class);
		return (ServletResponseDTO<T>) method.invoke(blo, parameters);
	}
}