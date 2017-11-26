package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class BloFactory {

    private static String namespace = Common.getNamespace(BloFactory.class);
    
    private BloFactory() {
        throw new IllegalStateException("Factory class");
    }
    
    @SuppressWarnings("unchecked")
    public static GenericBLO getBlo(String bloClass) throws HandlerGenericException {
        GenericBLO response = null;
        try {
            Class clazz = Class.forName(namespace + bloClass + "BLO");
            response = BloFactory.getBlo(clazz);
        } catch (ClassNotFoundException exception) {
            throw new HandlerGenericException(exception, "Class " + bloClass + " not found");
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
                throw new HandlerGenericException(exception, "Error invoking class " + bloClass.getSimpleName());
            }
        }
        return response;
    }
}
