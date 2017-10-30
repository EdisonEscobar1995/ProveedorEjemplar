package Nutresa.ExemplaryProvider.Types;

public interface ParameterProvider {

    public Config getConfig(String configName);

    public int length();

    // public Object getParameter(String name);

    public Object[] getParameters(Class<?>[] e) throws IllegalAccessException, InstantiationException;

    public void parseParameters(String parameterName);
}
