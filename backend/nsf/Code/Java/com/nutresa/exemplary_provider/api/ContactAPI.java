package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.ContactBLO;
import com.nutresa.exemplary_provider.dtl.ContactDTO;

public class ContactAPI  extends GenericAPI<ContactDTO, ContactBLO> {

    public ContactAPI() {
        super(ContactDTO.class, ContactBLO.class);
    }

}
