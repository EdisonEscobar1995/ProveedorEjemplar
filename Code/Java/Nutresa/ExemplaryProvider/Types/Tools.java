package Nutresa.ExemplaryProvider.Types;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ibm.commons.util.StringUtil;

public class Tools {

    public static String print_r(Object someObject) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(someObject);
    }
    
    public static String StringRepeat(String repeat, int times) {
        return new String(new char[times]).replace("\0", repeat);
    }
    
    public static String StringRepeat(String repeat, char separator, int times) {
        String splitter = "♀♂";
        return StringUtil.concatStrings(StringRepeat(repeat + splitter, times).split(splitter), separator, true);
    }

    @SuppressWarnings("unchecked")
    public static <T> T getValue(String stringValue, Class<?> type) {
        Object value = null;

        switch (Types.getType(type)) {
        case BYTE:
            value = Byte.valueOf(stringValue);
            break;
        case BOOLEAN:
            value = Boolean.valueOf(stringValue);
            break;
        case SHORT:
            value = Short.valueOf(stringValue);
            break;
        case CHAR:
            value = stringValue.charAt(0);
            break;
        case INT:
            value = Integer.decode(stringValue);
            break;
        case FLOAT:
            value = Float.valueOf(stringValue);
            break;
        case LONG:
            value = Long.valueOf(stringValue);
            break;
        case DOUBLE:
            value = Double.valueOf(stringValue);
            break;
        }
        return (T) value;
    }
    
}
