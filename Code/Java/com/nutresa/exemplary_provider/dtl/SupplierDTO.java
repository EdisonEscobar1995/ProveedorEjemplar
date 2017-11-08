package com.nutresa.exemplary_provider.dtl;

import java.util.List;

public class SupplierDTO {
    private static final String form = "frSupplier";
    private String id;
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
    private String otherSector; // this can be of type SectorDTO 
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
    
    
}
