package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class BloFactory {

    @SuppressWarnings("unchecked")
    public static GenericBLO getBlo(String bloClass) throws HandlerGenericException {
        GenericBLO response = null;
        try {
            Class clazz = Class.forName(Common.getNamespace(BloFactory.class) + bloClass + "BLO");
            response = BloFactory.getBlo(clazz);
        } catch (ClassNotFoundException exception) {
            throw new HandlerGenericException("Class " + bloClass + " not found");
        } catch (Exception exception){
            throw new HandlerGenericException(exception);
        }
        
        return response;
    }

    @SuppressWarnings("unchecked")
    public static GenericBLO getBlo(Class<? extends GenericBLO> bloClass) throws HandlerGenericException {
        GenericBLO response = null;
        if (null != bloClass) {
            try {
                return bloClass.newInstance();
            } catch (Exception exception) {
                throw new HandlerGenericException("Error invoking class " + bloClass.getSimpleName());
            }
        }
        return response;
    }
}
