package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CustomerDTO {
    @Expose
    private String name;
    @Expose
    private short percentageOfParticipationInSales;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public short getPercentageOfParticipationInSales() {
        return percentageOfParticipationInSales;
    }

    public void setPercentageOfParticipationInSales(
            short percentageOfParticipationInSales) {
        this.percentageOfParticipationInSales = percentageOfParticipationInSales;
    }

}
