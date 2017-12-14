package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.TranslationDTO;

public class TranslationDAO extends GenericDAO<TranslationDTO> {

    public static final String COOKIE_NAME = "language";
    
    public static final String PARAMETER_NAME = "language"; 
    
    public TranslationDAO() {
        super(TranslationDTO.class);
    }

}
