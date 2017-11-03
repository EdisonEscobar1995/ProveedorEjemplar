package com.nutresa.app.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.nutresa.app.exemplary_provider.bll.CategoryBLO;
import com.nutresa.app.exemplary_provider.dtl.CategoryDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;


public class CategoryAPI extends GenericAPI<CategoryDTO, CategoryBLO> {

    public CategoryAPI() {
        super(CategoryDTO.class, CategoryBLO.class);
    }
    
    public ServletResponseDTO<?> save(CategoryDTO dto) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{      
        CategoryBLO blo = new CategoryBLO();
        Method method = blo.getClass().getMethod("save", CategoryDTO.class);
        return (ServletResponseDTO<?>) method.invoke(blo, dto);
    }
    
    public ServletResponseDTO<?> update(CategoryDTO dto) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{
        CategoryBLO blo = new CategoryBLO();
        Method method = blo.getClass().getMethod("update", CategoryDTO.class);
        return (ServletResponseDTO<?>) method.invoke(blo, dto);
    }
    
}
