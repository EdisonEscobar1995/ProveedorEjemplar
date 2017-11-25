package com.nutresa.exemplary_provider.dtl;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.annotations.Expose;

public class SupplierDTO {
    @Expose
    private String id;
    @Expose
    private String businessName;
    @Expose
    private String idCompanySize;
    @Expose
    private String idSupply;
    @Expose
    private String idCategory;
    @Expose
    private String idSubCategory;
    private List<String> idDocuments;
    @Expose
    private List<AttachmentDTO> document;
    @Expose
    private String nit;
    @Expose
    private String idCompanyType;
    @Expose
    private boolean producerLivestok;
    @Expose
    private String idSocietyType;
    @Expose
    private short yearOfEstablishment;
    @Expose
    private String principalAdress;
    @Expose
    private String idCountry;
    @Expose
    private String idDepartment;
    @Expose
    private String idCity;
    @Expose
    private String branchOffice;
    @Expose
    private String telephone;
    @Expose
    private String fax;
    @Expose
    private List<String> emails;
    @Expose
    private String codeZip;
    @Expose
    private String nameLegalAgent;
    @Expose
    private String fullNameContact;
    @Expose
    private String jobPosition;
    @Expose
    private String phoneOfContact;
    @Expose
    private String emailOfContact;
    @Expose
    private String idSector;
    @Expose
    private String otherSector;
    @Expose
    private String packagingProvided;
    @Expose
    private float valueAssets;
    private List<String> idAttachedFinancialReport;
    @Expose
    private List<AttachmentDTO> attachedFinancialReport;
    @Expose
    private int numberOfDirectEmployees;
    @Expose
    private int numberOfSubContratedEmployees;
    @Expose
    private String webSite;
    @Expose
    private String typeOfCurrency;
    @Expose
    private float annualSalesValue;
    @Expose
    private List<CustomerDTO> principalCustomer;
    @Expose
    private short participationInSalesWithGroupNutresa;
    @Expose
    private String nameContactPersonInGroupNutresa;
    @Expose
    private String emailContactPersonInGroupNutresa;
    @Expose
    private String phoneContactPersonInGroupNutresa;
    @Expose
    private String geograficDescriptionOfPrincipalMaterials;
    @Expose
    private boolean currentlyExport;
    @Expose
    private String exportDestination;
    @Expose
    private String nameCertification;
    @Expose
    private boolean globalAgreement;
    @Expose
    private boolean chemicalSubstance;

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

    public String getBranchOffice() {
        return branchOffice;
    }

    public void setBranchOffice(String branchOffice) {
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

    public String getExportDestination() {
        return exportDestination;
    }

    public void setExportDestination(String exportDestination) {
        this.exportDestination = exportDestination;
    }

    public String getNameCertification() {
        return nameCertification;
    }

    public void setNameCertification(String nameCertification) {
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

    public String getIdSupply() {
        return idSupply;
    }

    public void setIdSupply(String idSupply) {
        this.idSupply = idSupply;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public List<String> getIdDocuments() {
        return idDocuments;
    }

    public void autoSetIdDocuments() {
        this.idDocuments = new ArrayList<String>();
        for (AttachmentDTO attachment : this.document) {
            this.idDocuments.add(attachment.getId());
        }
    }

    public List<AttachmentDTO> getDocument() {
        return document;
    }

    public void setDocument(List<AttachmentDTO> document) {
        this.document = document;
    }

    public List<String> getIdAttachedFinancialReport() {
        return idAttachedFinancialReport;
    }

    public void autoSetIdAttachedFinancialReport() {
        this.idAttachedFinancialReport = new ArrayList<String>();
        for (AttachmentDTO attachment : this.attachedFinancialReport) {
            this.idAttachedFinancialReport.add(attachment.getId());
        }
    }

    public List<AttachmentDTO> getAttachedFinancialReport() {
        return attachedFinancialReport;
    }

    public void setAttachedFinancialReport(List<AttachmentDTO> attachedFinancialReport) {
        this.attachedFinancialReport = attachedFinancialReport;
    }

    public void setTypeOfCurrency(String typeOfCurrency) {
        this.typeOfCurrency = typeOfCurrency;
    }

    public String getTypeOfCurrency() {
        return typeOfCurrency;
    }

}
