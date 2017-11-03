package com.nutresa.app.exemplary_provider.api;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.nutresa.app.exemplary_provider.bll.NotificationBLO;
import com.nutresa.app.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.app.exemplary_provider.dtl.ServletResponseDTO;

@SuppressWarnings("unchecked")
public class NotificationAPI<T> extends
GenericAPI<NotificationDTO, NotificationBLO> {
	public NotificationAPI() {
		super(NotificationDTO.class, NotificationBLO.class);
	}

	public ServletResponseDTO<T> save(NotificationDTO dto)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		NotificationBLO blo = new NotificationBLO();
		Method method = blo.getClass().getMethod("save", NotificationDTO.class);
		return (ServletResponseDTO<T>) method.invoke(blo, dto);
	}

	public ServletResponseDTO<T> update(NotificationDTO dto)
	throws NoSuchMethodException, IllegalAccessException,
	InvocationTargetException, InstantiationException {
		NotificationBLO blo = new NotificationBLO();
		Method method = blo.getClass().getMethod("update",
				NotificationDTO.class);
		return (ServletResponseDTO<T>) method.invoke(blo, dto);
	}
}
