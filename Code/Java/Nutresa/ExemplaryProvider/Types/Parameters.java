package Nutresa.ExemplaryProvider.Types;

import com.google.gson.JsonObject;

public class Parameters {

    private static final String parameterName = "params"; 
    private static final String configName = "config";
    
    JsonObject JsonParameters;

    private ParameterProvider params;

    private Config requestConfig;
    
    public Parameters(ParameterProvider provider) {
        requestConfig = provider.getConfig(configName);
        provider.parseParameters(parameterName);
        params = provider;
    }
    
    public Object[] getParameters(Class<?>[] e) throws IllegalAccessException, InstantiationException {
        return params.getParameters(e);
    }

    public int length() {
        return params.length();
    }
}