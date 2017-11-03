package com.nutresa.app.exemplary_provider.dal;

import com.nutresa.app.exemplary_provider.dtl.NotificationDTO;

public class NotificationDAO extends GenericDAO<NotificationDTO>{
    public NotificationDAO() {
        super(NotificationDTO.class);
        this.viewName = "vwDevIds";
    }
}
