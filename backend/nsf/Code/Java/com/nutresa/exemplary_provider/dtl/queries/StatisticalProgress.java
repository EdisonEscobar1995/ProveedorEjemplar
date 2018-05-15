package com.nutresa.exemplary_provider.dtl.queries;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.google.gson.annotations.Expose;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class StatisticalProgress {
    @Expose
    public short totalSupplier;
    @Expose
    public Map<String, Double> axesStatisticData;

    public StatisticalProgress() {
        totalSupplier = 0;
        axesStatisticData = new HashMap<String, Double>();
    }

    /**
     * Si el <code>axisName</code> aún no existe, entonces se crea, de lo
     * contrario aumenta el contador del <code>axisName</code>
     * 
     * @param axisName
     * @throws HandlerGenericException
     *             si el <code>axisName</code> es <code>null</code> o es vacio.
     */
    public void createAxisOrCounter(String axisName) throws HandlerGenericException {
        if (null != axisName && !axisName.trim().isEmpty()) {
            axisName = axisName.trim();
            if (axesStatisticData.containsKey(axisName)) {
                counterInAxis(axisName);
            } else {
                axesStatisticData.put(axisName, (double) 0);
                counterInAxis(axisName);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }
    }

    private void counterInAxis(String axisName) {
        double counter = axesStatisticData.get(axisName);
        counter = counter + 1;
        axesStatisticData.put(axisName, counter);
    }

    /**
     * Recorre todos los ejes y su contador lo transforma en porcentaje
     */
    public void calculatePercentageInAxes() {
        if (axesStatisticData.size() > 0) {
            Map<String, Double> axesWithPercentage = new HashMap<String, Double>();
            Iterator<String> iterator = axesStatisticData.keySet().iterator();
            while (iterator.hasNext()) {
                String keyAxis = iterator.next();
                double valueInAxis = axesStatisticData.get(keyAxis);
                double percentage = (valueInAxis * 100) / totalSupplier;
                axesWithPercentage.put(keyAxis, percentage);
            }
            axesStatisticData = axesWithPercentage;
        }
    }

}
