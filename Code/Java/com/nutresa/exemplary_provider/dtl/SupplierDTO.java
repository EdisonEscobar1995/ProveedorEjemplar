package com.nutresa.exemplary_provider.dtl;

import java.util.List;

public class SupplierDTO {
    private static final String form = "frSupplier";
    private String id;
    private boolean companySizeWasChanged;
    private SurveyDTO survey;
    // GENERAL INFORMATION
    private boolean participateInSurvey;
    private String name;
    private SizeCompanyDTO sizeCompany;
    private CategoryDTO category;
    private SubCategoryDTO subCategory;
    private List<String> document;
    private String nit;
    private TypeCompanyDTO typeCompany;
    private boolean producerLivestok;
    private TypeSocietyDTO typeSociety;
    private short yearOfEstablishment;
    private String principalAdress;
    private CountryDTO country;
    private DepartmentDTO department;
    private CityDTO city;
    private List<String> branchOffice;
    private String telephone;
    private String fax;
    private String email;
    private String codeZip;
    private String nameLegalAgent;
    private String fullNameContact;
    private String jobPosition;
    private String phoneOfContact;
    private String emailOfContact;

    // COMERCIAL INFORMATION
    private SectorDTO sector;
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

    public boolean isCompanySizeWasChanged() {
        return companySizeWasChanged;
    }

    public void setCompanySizeWasChanged(boolean companySizeWasChanged) {
        this.companySizeWasChanged = companySizeWasChanged;
    }

    public SurveyDTO getSurvey() {
        return survey;
    }

    public void setSurvey(SurveyDTO survey) {
        this.survey = survey;
    }

    public boolean isParticipateInSurvey() {
        return participateInSurvey;
    }

    public void setParticipateInSurvey(boolean participateInSurvey) {
        this.participateInSurvey = participateInSurvey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SizeCompanyDTO getSizeCompany() {
        return sizeCompany;
    }

    public void setSizeCompany(SizeCompanyDTO sizeCompany) {
        this.sizeCompany = sizeCompany;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public SubCategoryDTO getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(SubCategoryDTO subCategory) {
        this.subCategory = subCategory;
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

    public TypeCompanyDTO getTypeCompany() {
        return typeCompany;
    }

    public void setTypeCompany(TypeCompanyDTO typeCompany) {
        this.typeCompany = typeCompany;
    }

    public boolean isProducerLivestok() {
        return producerLivestok;
    }

    public void setProducerLivestok(boolean producerLivestok) {
        this.producerLivestok = producerLivestok;
    }

    public TypeSocietyDTO getTypeSociety() {
        return typeSociety;
    }

    public void setTypeSociety(TypeSocietyDTO typeSociety) {
        this.typeSociety = typeSociety;
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

    public CountryDTO getCountry() {
        return country;
    }

    public void setCountry(CountryDTO country) {
        this.country = country;
    }

    public DepartmentDTO getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentDTO department) {
        this.department = department;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public SectorDTO getSector() {
        return sector;
    }

    public void setSector(SectorDTO sector) {
        this.sector = sector;
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

    public void setNumberOfSubContratedEmployees(
            int numberOfSubContratedEmployees) {
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

    public void setParticipationInSalesWithGroupNutresa(
            short participationInSalesWithGroupNutresa) {
        this.participationInSalesWithGroupNutresa = participationInSalesWithGroupNutresa;
    }

    public String getNameContactPersonInGroupNutresa() {
        return nameContactPersonInGroupNutresa;
    }

    public void setNameContactPersonInGroupNutresa(
            String nameContactPersonInGroupNutresa) {
        this.nameContactPersonInGroupNutresa = nameContactPersonInGroupNutresa;
    }

    public String getEmailContactPersonInGroupNutresa() {
        return emailContactPersonInGroupNutresa;
    }

    public void setEmailContactPersonInGroupNutresa(
            String emailContactPersonInGroupNutresa) {
        this.emailContactPersonInGroupNutresa = emailContactPersonInGroupNutresa;
    }

    public String getPhoneContactPersonInGroupNutresa() {
        return phoneContactPersonInGroupNutresa;
    }

    public void setPhoneContactPersonInGroupNutresa(
            String phoneContactPersonInGroupNutresa) {
        this.phoneContactPersonInGroupNutresa = phoneContactPersonInGroupNutresa;
    }

    public String getGeograficDescriptionOfPrincipalMaterials() {
        return geograficDescriptionOfPrincipalMaterials;
    }

    public void setGeograficDescriptionOfPrincipalMaterials(
            String geograficDescriptionOfPrincipalMaterials) {
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

    public static String getForm() {
        return form;
    }

    public String getId() {
        return id;
    }

}
