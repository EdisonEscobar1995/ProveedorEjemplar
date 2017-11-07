package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.NotificationDTO;

public class NotificationDAO extends GenericDAO<NotificationDTO>{
    @SuppressWarnings("static-access")
	public NotificationDAO() {
        super(NotificationDTO.class);
    	this.viewAll = "vwNotifications";
    }
}
