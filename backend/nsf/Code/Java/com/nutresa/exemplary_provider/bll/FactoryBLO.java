package com.nutresa.exemplary_provider.bll;

import org.openntf.domino.utils.DominoUtils;

import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class FactoryBLO {

    private static String namespace = Common.getNamespace(FactoryBLO.class);
    
    private FactoryBLO() {
        throw new IllegalStateException("Factory class");
    }
    
    @SuppressWarnings("unchecked")
    public static GenericBLO getBlo(String bloClass) throws HandlerGenericException {
        GenericBLO response = null;
        try {
            Class clazz = Class.forName(namespace + bloClass + "BLO");
            response = FactoryBLO.getBlo(clazz);
        } catch (ClassNotFoundException exception) {
            throw new HandlerGenericException(exception, "Class " + bloClass + " not found");
        } catch (Exception exception){
            DominoUtils.handleException(new Throwable(exception));
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
                DominoUtils.handleException(new Throwable(exception));
                throw new HandlerGenericException(exception, "Error invoking class " + bloClass.getSimpleName());
            }
        }
        return response;
    }
}
