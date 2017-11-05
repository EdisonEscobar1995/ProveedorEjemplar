package com.nutresa.app.exemplary_provider.api;

import com.nutresa.app.exemplary_provider.bll.NotificationBLO;
import com.nutresa.app.exemplary_provider.dtl.NotificationDTO;

public class NotificationAPI extends GenericAPI<NotificationDTO, NotificationBLO> {

	public NotificationAPI() {
		super(NotificationDTO.class, NotificationBLO.class);
	}

}
