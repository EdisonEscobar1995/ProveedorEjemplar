package com.nutresa.app.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.nutresa.app.exemplary_provider.bll.CategoryBLO;
import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;

@SuppressWarnings("unchecked")
public class CategoryAPI<T> extends GenericAPI<CategoryDTO, CategoryBLO> {

	public CategoryAPI() {
		super(CategoryDTO.class, CategoryBLO.class);
	}

	public ServletResponseDTO<T> save(CategoryDTO dto)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		CategoryBLO blo = new CategoryBLO();
		Method method = blo.getClass().getMethod("save", CategoryDTO.class);
		return (ServletResponseDTO<T>) method.invoke(blo, dto);
	}

	public ServletResponseDTO<T> update(CategoryDTO dto)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		CategoryBLO blo = new CategoryBLO();
		Method method = blo.getClass().getMethod("update", CategoryDTO.class);
		return (ServletResponseDTO<T>) method.invoke(blo, dto);
	}

}
