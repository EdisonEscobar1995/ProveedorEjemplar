package com.nutresa.exemplary_provider.api;

import java.util.List;

import com.nutresa.exemplary_provider.bll.NotificationBLO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class NotificationAPI extends GenericAPI<NotificationDTO, NotificationBLO> {

    public NotificationAPI() {
        super(NotificationDTO.class, NotificationBLO.class);
    }

    @Override
    public ServletResponseDTO<List<NotificationDTO>> getAll() {
        ServletResponseDTO<List<NotificationDTO>> response = null;
        NotificationBLO notificationBLO = new NotificationBLO();
        try {
            response = new ServletResponseDTO<List<NotificationDTO>>(notificationBLO.getAllNotification());
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<NotificationDTO>>(exception);
        }

        return response;
    }

}
