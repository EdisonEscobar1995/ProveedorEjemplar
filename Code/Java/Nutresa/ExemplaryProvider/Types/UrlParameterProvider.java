package Nutresa.ExemplaryProvider.Types;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class UrlParameterProvider implements ParameterProvider {

    protected String url;
    protected String parameterName;
    protected String configName;
    private Config configOptions = new Config();
    protected LinkedHashMap<String, String> params = new LinkedHashMap<String, String>();

    // TODO Delete
    private JsonObject json;
    

    public UrlParameterProvider(String url) {
        this.url = url;
    }

    public void parseParameters(String parameterName) {
        Pattern p = Pattern.compile("(?:([^/]+)=([^/$]*))|(?:([^/]+))");
        Matcher m = p.matcher(url);
        int i = 1;
        params.clear();
        while (m.find()) {
            String paramName = m.group(1);

            if (paramName != null && !paramName.isEmpty()) {
                params.put(m.group(1), m.group(2));
            } else if (m.group(3) != null) {
                params.put("param" + i++, m.group(3).toString());
            }
        }
    }

    public Object[] getParameters(Class<?>[] e) throws IllegalAccessException, InstantiationException {
        Object[] oe = new Object[e.length];
        int i = 0;
        for (String param : params.values()) {
            oe[i] = e[i].cast(param);
            i++;
        }
        return oe;
    }
    
    public Config getConfig(String configName) {
        if (configOptions == null) {
            configOptions = new Config();
            if (json.has(configName)) {
                // Object requestConfig = provider.getConfig();
                JsonObject jsonConfig = json.getAsJsonObject(configName);
                Iterator<Entry<String, JsonElement>> it = jsonConfig.entrySet().iterator();
                while (it.hasNext()) {
                    Entry<String, JsonElement> item = it.next();
                    JsonElement value = item.getValue();
                    if (value.isJsonPrimitive()) {
                        configOptions.put(item.getKey(), value.getAsString());
                    }
                }
            }
        }
        return configOptions;
    }

    public int length() {
        int size = 0;
        if (params != null) {
            size = params.size();
        }
        return size;
    }
}