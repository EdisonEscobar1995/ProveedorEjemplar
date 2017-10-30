package Nutresa.ExemplaryProvider.Types;

import java.util.TreeMap;


public class Config extends TreeMap<String, String> {

    private static final long serialVersionUID = 1L;

    public String get(String name, String defaulValue) {
        String value = super.get(name);
        return value == null ? defaulValue : value;
    }

    @SuppressWarnings("unchecked")
    private <T> T getValue(String name, Object defaultValue, Class<?> type) {
        Object value = getValue(name, type);
        if (value == null) {
            value = defaultValue;
        }
        return (T) value;
    }

    @SuppressWarnings("unchecked")
    public <T> T getValue(String name, Class<?> type) {
        String stringValue = super.get(name);
        Object value = null;
        if (stringValue != null) {
            try {
                value = Tools.getValue(stringValue, type);
            } catch (Exception e) {
                return null;
            }
            return (T) value;
        } else {
            return null;
        }
    }
    
    public int getInt(String name) {
        return getValue(name, int.class);
    }

    public int getInt(String name, int defaultValue) {
        return getValue(name, defaultValue, int.class);
    }

    public int get(String name, int defaultValue) {
        return getValue(name, defaultValue, int.class);
    }
    
    public long getLong(String name) {
        return getValue(name, long.class);
    }
    
    public long getLong(String name, long defaultValue) {
        return getValue(name, defaultValue, long.class);
    }
    
    public long get(String name, long defaultValue) {
        return getValue(name, defaultValue, long.class);
    }
    
    public boolean getBoolean(String name) {
        return getValue(name, boolean.class);
    }
    
    public boolean getBoolean(String name, boolean defaultValue) {
        return getValue(name, defaultValue, boolean.class);
    }
    
    public boolean get(String name, boolean defaultValue) {
        return getValue(name, defaultValue, boolean.class);
    }
    
    public char getChar(String name) {
        return getValue(name, char.class);
    }
    
    public char getChar(String name, char defaultValue) {
        return getValue(name, defaultValue, char.class);
    }
    
    public char get(String name, char defaultValue) {
        return getValue(name, defaultValue, char.class);
    }
    
    public double getDouble(String name) {
        return getValue(name, double.class);
    }
    
    public double getDouble(String name, double defaultValue) {
        return getValue(name, defaultValue, double.class);
    }

    public double get(String name, double defaultValue) {
        return getValue(name, defaultValue, double.class);
    }
    
    public float getFloat(String name) {
        return getValue(name, float.class);
    }
    
    public float getFloat(String name, float defaultValue) {
        return getValue(name, defaultValue, float.class);
    }
    
    public float get(String name, float defaultValue) {
        return getValue(name, defaultValue, float.class);
    }

    public byte getByte(String name) {
        return getValue(name, byte.class);
    }

    public byte getByte(String name, byte defaultValue) {
        return getValue(name, defaultValue, byte.class);
    }

    public byte get(String name, byte defaultValue) {
        return getValue(name, defaultValue, byte.class);
    }

    public short getShort(String name) {
        return getValue(name, short.class);
    }

    public short getShort(String name, short defaultValue) {
        return getValue(name, defaultValue, short.class);
    }
    
    public short get(String name, short defaultValue) {
        return getValue(name, defaultValue, short.class);
    }
}
