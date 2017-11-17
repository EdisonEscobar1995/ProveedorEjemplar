package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CustomerDTO extends MasterDTO {
    @Expose
    private short percentageOfParticipationInSales;
    private String idSupplier;

    public short getPercentageOfParticipationInSales() {
        return percentageOfParticipationInSales;
    }

    public void setPercentageOfParticipationInSales(short percentageOfParticipationInSales) {
        this.percentageOfParticipationInSales = percentageOfParticipationInSales;
    }

    public String getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplier(String idSupplier) {
        this.idSupplier = idSupplier;
    }

}
