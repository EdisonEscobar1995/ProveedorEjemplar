package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.NotificationBLO;
import com.nutresa.exemplary_provider.dtl.NotificationDTO;

public class NotificationAPI extends GenericAPI<NotificationDTO, NotificationBLO> {

	public NotificationAPI() {
		super(NotificationDTO.class, NotificationBLO.class);
	}

}
