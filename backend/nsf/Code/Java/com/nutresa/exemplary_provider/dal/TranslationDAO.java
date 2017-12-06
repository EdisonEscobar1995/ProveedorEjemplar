package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.TranslationDTO;

public class TranslationDAO extends GenericDAO<TranslationDTO> {

    public final static String COOKIE_NAME = "language";
    public final static String PARAMTER_NAME = "language"; 
    
    public TranslationDAO() {
        super(TranslationDTO.class);
    }

}
