package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CustomerDTO extends ReferenceDTO{
    @Expose
    private short percentageOfParticipationInSales;

    public short getPercentageOfParticipationInSales() {
        return percentageOfParticipationInSales;
    }

    public void setPercentageOfParticipationInSales(
            short percentageOfParticipationInSales) {
        this.percentageOfParticipationInSales = percentageOfParticipationInSales;
    }

}
