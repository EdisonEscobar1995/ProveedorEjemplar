package com.nutresa.exemplary_provider.dtl;

import java.util.List;

public class SupplierDTO {
    private String id;
    private String name;
    private String idCompanySize;
    private String idCategory;
    private String idSubCategory;
    private List<String> document;
    private String nit;
    private String idCompanyType;
    private boolean producerLivestok;
    private String idSocietyType;
    private short yearOfEstablishment;
    private String principalAdress;
    private String idCountry;
    private String idDepartment;
    private String idCity;
    private List<String> branchOffice;
    private String telephone;
    private String fax;
    private List<String> emails;
    private String codeZip;
    private String nameLegalAgent;
    private String fullNameContact;
    private String jobPosition;
    private String phoneOfContact;
    private String emailOfContact;
    private String idSector;
    private String otherSector;
    private String packagingProvided;
    private float valueAssets;
    private String attachedFinancialReport;
    private int numberOfDirectEmployees;
    private int numberOfSubContratedEmployees;
    private String webSite;
    private float annualSalesValue;
    private List<CustomerDTO> principalCustomer;
    private short participationInSalesWithGroupNutresa;
    private String nameContactPersonInGroupNutresa;
    private String emailContactPersonInGroupNutresa;
    private String phoneContactPersonInGroupNutresa;
    private String geograficDescriptionOfPrincipalMaterials;
    private boolean currentlyExport;
    private List<String> exportDestination;
    private List<String> nameCertification;
    private boolean globalAgreement;
    private boolean chemicalSubstance;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getDocument() {
        return document;
    }

    public void setDocument(List<String> document) {
        this.document = document;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public boolean isProducerLivestok() {
        return producerLivestok;
    }

    public void setProducerLivestok(boolean producerLivestok) {
        this.producerLivestok = producerLivestok;
    }

    public short getYearOfEstablishment() {
        return yearOfEstablishment;
    }

    public void setYearOfEstablishment(short yearOfEstablishment) {
        this.yearOfEstablishment = yearOfEstablishment;
    }

    public String getPrincipalAdress() {
        return principalAdress;
    }

    public void setPrincipalAdress(String principalAdress) {
        this.principalAdress = principalAdress;
    }

    public List<String> getBranchOffice() {
        return branchOffice;
    }

    public void setBranchOffice(List<String> branchOffice) {
        this.branchOffice = branchOffice;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public List<String> getEmail() {
        return emails;
    }

    public void setEmail(List<String> emails) {
        this.emails = emails;
    }

    public String getCodeZip() {
        return codeZip;
    }

    public void setCodeZip(String codeZip) {
        this.codeZip = codeZip;
    }

    public String getNameLegalAgent() {
        return nameLegalAgent;
    }

    public void setNameLegalAgent(String nameLegalAgent) {
        this.nameLegalAgent = nameLegalAgent;
    }

    public String getFullNameContact() {
        return fullNameContact;
    }

    public void setFullNameContact(String fullNameContact) {
        this.fullNameContact = fullNameContact;
    }

    public String getJobPosition() {
        return jobPosition;
    }

    public void setJobPosition(String jobPosition) {
        this.jobPosition = jobPosition;
    }

    public String getPhoneOfContact() {
        return phoneOfContact;
    }

    public void setPhoneOfContact(String phoneOfContact) {
        this.phoneOfContact = phoneOfContact;
    }

    public String getEmailOfContact() {
        return emailOfContact;
    }

    public void setEmailOfContact(String emailOfContact) {
        this.emailOfContact = emailOfContact;
    }

    public String getOtherSector() {
        return otherSector;
    }

    public void setOtherSector(String otherSector) {
        this.otherSector = otherSector;
    }

    public String getPackagingProvided() {
        return packagingProvided;
    }

    public void setPackagingProvided(String packagingProvided) {
        this.packagingProvided = packagingProvided;
    }

    public float getValueAssets() {
        return valueAssets;
    }

    public void setValueAssets(float valueAssets) {
        this.valueAssets = valueAssets;
    }

    public String getAttachedFinancialReport() {
        return attachedFinancialReport;
    }

    public void setAttachedFinancialReport(String attachedFinancialReport) {
        this.attachedFinancialReport = attachedFinancialReport;
    }

    public int getNumberOfDirectEmployees() {
        return numberOfDirectEmployees;
    }

    public void setNumberOfDirectEmployees(int numberOfDirectEmployees) {
        this.numberOfDirectEmployees = numberOfDirectEmployees;
    }

    public int getNumberOfSubContratedEmployees() {
        return numberOfSubContratedEmployees;
    }

    public void setNumberOfSubContratedEmployees(int numberOfSubContratedEmployees) {
        this.numberOfSubContratedEmployees = numberOfSubContratedEmployees;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public float getAnnualSalesValue() {
        return annualSalesValue;
    }

    public void setAnnualSalesValue(float annualSalesValue) {
        this.annualSalesValue = annualSalesValue;
    }

    public List<CustomerDTO> getPrincipalCustomer() {
        return principalCustomer;
    }

    public void setPrincipalCustomer(List<CustomerDTO> principalCustomer) {
        this.principalCustomer = principalCustomer;
    }

    public short getParticipationInSalesWithGroupNutresa() {
        return participationInSalesWithGroupNutresa;
    }

    public void setParticipationInSalesWithGroupNutresa(short participationInSalesWithGroupNutresa) {
        this.participationInSalesWithGroupNutresa = participationInSalesWithGroupNutresa;
    }

    public String getNameContactPersonInGroupNutresa() {
        return nameContactPersonInGroupNutresa;
    }

    public void setNameContactPersonInGroupNutresa(String nameContactPersonInGroupNutresa) {
        this.nameContactPersonInGroupNutresa = nameContactPersonInGroupNutresa;
    }

    public String getEmailContactPersonInGroupNutresa() {
        return emailContactPersonInGroupNutresa;
    }

    public void setEmailContactPersonInGroupNutresa(String emailContactPersonInGroupNutresa) {
        this.emailContactPersonInGroupNutresa = emailContactPersonInGroupNutresa;
    }

    public String getPhoneContactPersonInGroupNutresa() {
        return phoneContactPersonInGroupNutresa;
    }

    public void setPhoneContactPersonInGroupNutresa(String phoneContactPersonInGroupNutresa) {
        this.phoneContactPersonInGroupNutresa = phoneContactPersonInGroupNutresa;
    }

    public String getGeograficDescriptionOfPrincipalMaterials() {
        return geograficDescriptionOfPrincipalMaterials;
    }

    public void setGeograficDescriptionOfPrincipalMaterials(String geograficDescriptionOfPrincipalMaterials) {
        this.geograficDescriptionOfPrincipalMaterials = geograficDescriptionOfPrincipalMaterials;
    }

    public boolean isCurrentlyExport() {
        return currentlyExport;
    }

    public void setCurrentlyExport(boolean currentlyExport) {
        this.currentlyExport = currentlyExport;
    }

    public List<String> getExportDestination() {
        return exportDestination;
    }

    public void setExportDestination(List<String> exportDestination) {
        this.exportDestination = exportDestination;
    }

    public List<String> getNameCertification() {
        return nameCertification;
    }

    public void setNameCertification(List<String> nameCertification) {
        this.nameCertification = nameCertification;
    }

    public boolean isGlobalAgreement() {
        return globalAgreement;
    }

    public void setGlobalAgreement(boolean globalAgreement) {
        this.globalAgreement = globalAgreement;
    }

    public boolean isChemicalSubstance() {
        return chemicalSubstance;
    }

    public void setChemicalSubstance(boolean chemicalSubstance) {
        this.chemicalSubstance = chemicalSubstance;
    }

    public String getId() {
        return id;
    }

    public String getIdCompanySize() {
        return idCompanySize;
    }

    public void setIdCompanySize(String idCompanySize) {
        this.idCompanySize = idCompanySize;
    }

    public String getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }

    public String getIdSubCategory() {
        return idSubCategory;
    }

    public void setIdSubCategory(String idSubCategory) {
        this.idSubCategory = idSubCategory;
    }

    public String getIdCompanyType() {
        return idCompanyType;
    }

    public void setIdCompanyType(String idCompanyType) {
        this.idCompanyType = idCompanyType;
    }

    public String getIdSocietyType() {
        return idSocietyType;
    }

    public void setIdSocietyType(String idSocietyType) {
        this.idSocietyType = idSocietyType;
    }

    public String getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }

    public String getIdDepartment() {
        return idDepartment;
    }

    public void setIdDepartment(String idDepartment) {
        this.idDepartment = idDepartment;
    }

    public String getIdCity() {
        return idCity;
    }

    public void setIdCity(String idCity) {
        this.idCity = idCity;
    }

    public List<String> getEmails() {
        return emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }

    public String getIdSector() {
        return idSector;
    }

    public void setIdSector(String idSector) {
        this.idSector = idSector;
    }

}
