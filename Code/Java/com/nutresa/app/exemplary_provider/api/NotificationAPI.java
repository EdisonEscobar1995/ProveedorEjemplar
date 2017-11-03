package com.nutresa.app.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.nutresa.app.exemplary_provider.bll.NotificationBLO;
import com.nutresa.app.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;


public class NotificationAPI extends GenericAPI<NotificationDTO, NotificationBLO>{
    public NotificationAPI(){
        super(NotificationDTO.class, NotificationBLO.class);
    }
        
    public ServletResponseDTO<?> save(NotificationDTO dto) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{      
        NotificationBLO blo = new NotificationBLO();
        Method method = blo.getClass().getMethod("save", NotificationDTO.class);
        return (ServletResponseDTO<?>) method.invoke(blo, dto);
    }
    
    public ServletResponseDTO<?> update(NotificationDTO dto) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{
        NotificationBLO blo = new NotificationBLO();
        Method method = blo.getClass().getMethod("update", NotificationDTO.class);
        return (ServletResponseDTO<?>) method.invoke(blo, dto);
    }
}
