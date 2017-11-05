package com.nutresa.app.exemplary_provider.bll;

import com.nutresa.app.exemplary_provider.dal.NotificationDAO;
import com.nutresa.app.exemplary_provider.dtl.NotificationDTO;

public class NotificationBLO extends GenericBLO<NotificationDTO, NotificationDAO> {

	public NotificationBLO() {
		super(NotificationDAO.class);
	}

}
