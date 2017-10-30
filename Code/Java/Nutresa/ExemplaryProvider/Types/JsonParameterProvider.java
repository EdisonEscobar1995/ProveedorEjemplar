package Nutresa.ExemplaryProvider.Types;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class JsonParameterProvider implements ParameterProvider {

    protected JsonObject json;
    protected String parameterName;
    protected String configName;
    private Config configOptions = null;

    protected JsonArray params = new JsonArray();

    public JsonParameterProvider(JsonObject json) {
        this.json = json;
    }

    public void parseParameters(String parameterName) {
        parameterName = configOptions.get("parameterName", parameterName);
        try {
            if (json != null && json.has(parameterName)) {
                JsonElement params = json.get(parameterName);
                if (params.isJsonArray()) {
                    this.params = json.getAsJsonArray(parameterName);
                }
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    protected List<Object> getJsonArrayParameter(JsonArray params) {
        List<Object> o = new ArrayList<Object>();

        for (JsonElement param : params) {
            if (param.isJsonArray()) {
                o.add(getJsonArrayParameter((JsonArray) param));
            } else {
                o.add(param);
            }
        }
        return o;
    }

    public Object[] getParameters(Class<?>[] e) throws IllegalAccessException, InstantiationException {
        Object[] oe = new Object[e.length];
        int i = 0;
        Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation().serializeNulls()
        // TODO MAF parametrizar
            .setDateFormat(configOptions.get("dateFormat", "Y/m/d"))
            // .setFieldNamingPolicy(FieldNamingPolicy.)
            .setPrettyPrinting().create();
        for (Class<?> t : e) {
            oe[i] = gson.fromJson(params.get(i), t);
            i++;
        }
        return oe;
    }
    
    public Config getConfig(String configName) {
        if (configOptions == null) {
            configOptions = new Config();
            if (json != null && json.has(configName)) {
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