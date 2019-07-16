import { intValidation, mailValitation, mailValitationMultiple } from '../../utils/rules';

const principalCustomerColumns = [
  {
    title: 'Supplier.principalCustomer.name',
    key: 'name',
  },
  {
    title: 'Supplier.principalCustomer.percentageOfParticipationInSales',
    key: 'percentageOfParticipationInSales',
    type: 'number',
  },
];

const contactNutresaGroupColumns = [
  {
    title: 'Supplier.contactNutresaGroup.name',
    key: 'name',
  },
  {
    title: 'Supplier.contactNutresaGroup.email',
    key: 'email',
    type: 'email',
  },
  {
    title: 'Supplier.contactNutresaGroup.phone',
    key: 'phone',
  },
];

const defaultOptions = [
  {
    id: 'true',
    name: 'Supplier.yes',
  },
  {
    id: 'false',
    name: 'Supplier.no',
  },
];
const defaultMoneyType = [
  {
    id: 'COP',
    name: 'COP Moneda colombiana',
  },
  {
    id: 'USD',
    name: 'USD Moneda EE.UU',
  },
  {
    id: 'CRC',
    name: 'CRC Moneda Costa Rica',
  },
  {
    id: 'CLP',
    name: 'CLP Moneda de Chile',
  },
  {
    id: 'PEN',
    name: 'PEN Moneda de Perú',
  },
];

const getAnios = () => {
  const anios = [];
  const date = new Date();
  for (let i = 1900; i <= date.getFullYear(); i += 1) {
    anios.push({ id: i.toString(), name: i.toString() });
  }
  return anios;
};

function getValueOption(value) {
  if (typeof (value) === 'boolean') {
    return value.toString();
  }
  return '';
}

function generalInfo(fields) {
  const {
    loading,
    supplier,
    rules: { supplier: { readOnly } },
    supplies,
    categories,
    getDataCategoryBySuply,
    subcategories,
    getDataSubCategoryByCategory,
    companyTypes,
    companySizes,
    societyTypes,
    countries,
    departments,
    system,
    getDataDepartmentsByCountry,
    cities,
    getDataCitiesByDepartment,
    updateAttachment,
    deleteAttachment,
    updateChangeIdCompanySize,
    setNumberOfDirectEmployees,
    setNumberOfSubContratedEmployees,
    sectors,
    setSector,
    setExport,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addContact,
    deleteContact,
    updateContact,
  } = fields;

  const {
    idSupply,
    idCategory,
    idSubCategory,
    idCompanySize,
    businessName,
    nit,
    idCompanyType,
    producerLivestok,
    idSocietyType,
    yearOfEstablishment,
    principalAdress,
    idOriginCountry,
    idDepartment,
    idCity,
    branchOffice,
    telephone,
    fax,
    emails,
    emailOfContact,
    codeZip,
    nameLegalAgent,
    idLegalAgent,
    jobPosition,
    phoneOfContact,
    fullNameContact,
    document,
    valueAssets,
    typeOfCurrencyValueAssets,
    typeOfCurrencyAnnualSales,
    annualSalesValue,
    companyLogo,
    numberOfDirectEmployees,
    numberOfSubContratedEmployees,
    employeesTotal,
    participationInSalesWithGroupNutresa,
    attachedFinancialReport,
    idSector,
    otherSector,
    webSite,
    packagingProvided,
    geograficDescriptionOfPrincipalMaterials,
    currentlyExport,
    nameCertification,
    exportDestination,
    globalAgreement,
    chemicalSubstance,
    actualSector,
    actuallyExport,
    principalCustomer,
    contactNutresaGroup,
  } = supplier;
  const {
    uploadMaxFilesize,
    uploadExtensions,
    otherSectorId,
    packagingMaterialCategoryId,
  } = system;

  const disabled = readOnly;

  return [
    {
      key: 1.1,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.businessName',
          key: 'businessName',
          value: businessName,
          required: true,
          disabled: true,
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idCompanySize',
          key: 'idCompanySize',
          value: idCompanySize,
          required: true,
          options: companySizes,
          disabled,
          handleChange: (value) => {
            updateChangeIdCompanySize(value);
          },
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idSupply',
          value: idSupply,
          key: 'idSupply',
          required: true,
          disabled: true,
          options: supplies,
          valuesToClean: {
            idCategory: {
              value: '',
            },
            idSubCategory: {
              value: '',
            },
          },
          handleChange: (value) => {
            getDataCategoryBySuply(value);
          },
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idCategory',
          key: 'idCategory',
          value: idCategory,
          options: categories,
          required: true,
          disabled,
          valuesToClean: {
            idSubCategory: {
              value: '',
            },
          },
          handleChange: (value) => {
            getDataSubCategoryByCategory(value);
          },
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idSubCategory',
          key: 'idSubCategory',
          value: idSubCategory,
          options: subcategories,
          disabled,
        },
        {
          label: 'Supplier.document',
          span: 12,
          type: 'upload',
          name: 'file',
          key: 'document',
          disabled,
          max: 2,
          fileList: document,
          uploadMaxFilesize,
          uploadExtensions,
          onChange: updateAttachment,
          onRemove: deleteAttachment,
        },
      ],
    },
    {
      key: 1.3,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.nit',
          key: 'nit',
          value: nit,
          required: true,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idCompanyType',
          key: 'idCompanyType',
          value: idCompanyType,
          options: companyTypes,
          disabled,
        },
        {
          span: 8,
          type: 'upload',
          label: 'Supplier.companyLogo',
          key: 'companyLogo',
          fileList: companyLogo,
          onChange: updateAttachment,
          onRemove: deleteAttachment,
          uploadMaxFilesize,
          uploadExtensions: ['.jpg', '.png', '.jpeg'],
          required: true,
          disabled,
          multiple: false,
        },
      ],
    },
    {
      key: 1.4,
      value: [
        {
          span: 6,
          type: 'select',
          label: 'Supplier.producerLivestok',
          key: 'producerLivestok',
          value: getValueOption(producerLivestok),
          options: defaultOptions,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idSocietyType',
          key: 'idSocietyType',
          value: idSocietyType,
          options: societyTypes,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.yearOfEstablishment',
          key: 'yearOfEstablishment',
          value: yearOfEstablishment.toString(),
          options: getAnios(),
          disabled,
        },
      ],
    },
    {
      key: 2.6,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Supplier.infoFinancial',
          key: 'infoFinancial',
        },
      ],
    },
    {
      key: 2.7,
      value: [
        {
          span: 6,
          type: 'select',
          label: 'Supplier.typeOfCurrencyValueAssets',
          key: 'typeOfCurrencyValueAssets',
          value: typeOfCurrencyValueAssets,
          options: defaultMoneyType,
          disabled,
        },
        {
          span: 6,
          type: 'inputNumber',
          label: 'Supplier.valueAssets',
          key: 'valueAssets',
          value: valueAssets,
          disabled,
        },
        {
          span: 8,
          type: 'upload',
          label: 'Supplier.attachedFinancialReport',
          key: 'attachedFinancialReport',
          fileList: attachedFinancialReport,
          onChange: updateAttachment,
          onRemove: deleteAttachment,
          uploadMaxFilesize,
          uploadExtensions,
          required: true,
          disabled,
        },
      ],
    },
    {
      key: 2.8,
      value: [
        {
          span: 6,
          type: 'select',
          label: 'Supplier.typeOfCurrencyAnnualSales',
          key: 'typeOfCurrencyAnnualSales',
          value: typeOfCurrencyAnnualSales,
          options: defaultMoneyType,
          disabled,
        },
        {
          span: 6,
          type: 'inputNumber',
          label: 'Supplier.annualSalesValue',
          key: 'annualSalesValue',
          value: annualSalesValue,
          disabled,
        },
      ],
    },
    {
      key: 2.9,
      value: [
        {
          span: 6,
          type: 'inputNumber',
          label: 'Supplier.numberOfDirectEmployees',
          key: 'numberOfDirectEmployees',
          value: numberOfDirectEmployees,
          handleChange: setNumberOfDirectEmployees,
          disabled,
          formatter: numberValue => numberValue,
          parser: numberValue => (numberValue || 0),
        },
        {
          span: 6,
          type: 'inputNumber',
          label: 'Supplier.numberOfSubContratedEmployees',
          key: 'numberOfSubContratedEmployees',
          value: numberOfSubContratedEmployees,
          handleChange: setNumberOfSubContratedEmployees,
          disabled,
          formatter: numberValue => numberValue,
          parser: numberValue => (numberValue || 0),
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.employeesTotal',
          key: 'employeesTotal',
          value: employeesTotal,
          disabled: true,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.participationInSalesWithGroupNutresa',
          key: 'participationInSalesWithGroupNutresa',
          value: participationInSalesWithGroupNutresa,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
      ],
    },
    {
      key: 3.0,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Supplier.principalCustomers',
          key: 'principalCustomers',
          disabled,
        },
      ],
    },
    {
      key: 3.1,
      value: [
        {
          type: 'table',
          key: 'principalCustomer',
          value: principalCustomer,
          disabled,
          colummns: principalCustomerColumns,
          loading,
          addData: addCustomer,
          deleteData: deleteCustomer,
          updateField: updateCustomer,
        },
      ],
    },
    {
      key: 3.2,
      value:
      [
        {
          span: 12,
          type: 'title',
          value: 'Supplier.location',
          key: 'location',
        },
      ],
    },
    {
      key: 3.3,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.principalAdress',
          key: 'principalAdress',
          value: principalAdress,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idOriginCountry',
          key: 'idOriginCountry',
          options: countries,
          disabled,
          value: idOriginCountry,
          valuesToClean: {
            idDepartment: {
              value: '',
            },
            idCity: {
              value: '',
            },
          },
          handleChange: (value) => {
            getDataDepartmentsByCountry(value);
          },
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idDepartment',
          key: 'idDepartment',
          value: idDepartment,
          options: departments,
          disabled,
          valuesToClean: {
            idCity: {
              value: '',
            },
          },
          handleChange: (value) => {
            getDataCitiesByDepartment(value);
          },
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.idCity',
          key: 'idCity',
          value: idCity,
          options: cities,
          disabled,
        },
      ],
    },
    {
      key: 3.4,
      value: [
        {
          type: 'textarea',
          label: 'Supplier.branchOffice',
          key: 'branchOffice',
          value: branchOffice,
          disabled,
        },
      ],
    },
    {
      key: 3.5,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Supplier.contact',
          key: 'contact',
          disabled,
        },
      ],
    },
    {
      key: 3.6,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.telephone',
          key: 'telephone',
          value: telephone,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.fax',
          value: fax,
          key: 'fax',
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Supplier.emails',
          key: 'emails',
          value: emails,
          mode: 'tags',
          options: emails.map(item => ({ id: item, name: item })),
          noSearch: true,
          rules: [
            { ...mailValitationMultiple },
          ],
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.codeZip',
          key: 'codeZip',
          value: codeZip,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
      ],
    },
    {
      key: 3.7,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Supplier.legalInfo',
          key: 'legalInfo',
          disabled,
        },
      ],
    },
    {
      key: 3.8,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.nameLegalAgent',
          key: 'nameLegalAgent',
          value: nameLegalAgent,
          required: true,
          whitespace: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.idLegalAgent',
          key: 'idLegalAgent',
          value: idLegalAgent,
          required: true,
          whitespace: true,
          disabled,
        },
      ],
    },
    {
      key: 3.9,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Supplier.inforContact',
          key: 'inforContact',
        },
      ],
    },
    {
      key: 4.0,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.fullNameContact',
          key: 'fullNameContact',
          value: fullNameContact,
          required: true,
          whitespace: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.jobPosition',
          key: 'jobPosition',
          value: jobPosition,
          required: true,
          whitespace: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.phoneOfContact',
          key: 'phoneOfContact',
          value: phoneOfContact,
          required: true,
          whitespace: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.emailOfContact',
          key: 'emailOfContact',
          value: emailOfContact,
          required: true,
          disabled,
          rules: [
            { ...mailValitation },
          ],
        },
      ],
    },
    {
      key: 4.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Supplier.idSector',
          key: 'idSector',
          value: idSector,
          options: sectors,
          handleChange: setSector,
          disabled,
        },
        {
          span: 8,
          type: 'input',
          label: 'Supplier.otherSector',
          key: 'otherSector',
          value: otherSector,
          hidden: (actualSector !== otherSectorId),
          required: true,
          disabled,
        },
        {
          span: 8,
          type: 'input',
          label: 'Supplier.webSite',
          key: 'webSite',
          value: webSite,
          disabled,
        },
      ],
    },
    {
      key: 4.2,
      value: [
        {
          type: 'radio',
          label: 'Supplier.packagingProvided',
          key: 'packagingProvided',
          value: packagingProvided,
          required: true,
          hidden: (idCategory !== packagingMaterialCategoryId),
          disabled,
          options: [
            {
              id: 'si',
              name: 'Supplier.yes',
            },
            {
              id: 'no',
              name: 'Supplier.no',
            },
            {
              id: 'na',
              name: 'N/A',
            },
          ],
        },
      ],
    },
    {
      key: 4.3,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Supplier.contactNutresaGroup',
          key: 'contactNutresaGroup',
          disabled,
        },
      ],
    },
    {
      key: 4.4,
      value: [
        {
          type: 'table',
          key: 'contactNutresaGroup',
          value: contactNutresaGroup,
          disabled,
          colummns: contactNutresaGroupColumns,
          loading,
          addData: addContact,
          deleteData: deleteContact,
          updateField: updateContact,
        },
      ],
    },
    {
      key: 4.5,
      value: [
        {
          type: 'title',
          value: 'Supplier.supplies',
          key: 'supplies',
        },
      ],
    },
    {
      key: 4.6,
      value: [
        {
          type: 'textarea',
          label: 'Supplier.geograficDescriptionOfPrincipalMaterials',
          key: 'geograficDescriptionOfPrincipalMaterials',
          value: geograficDescriptionOfPrincipalMaterials,
          disabled,
        },
      ],
    },
    {
      key: 4.7,
      value: [
        {
          type: 'title',
          value: 'Supplier.exports',
          key: 'exports',
        },
      ],
    },
    {
      key: 4.8,
      value: [
        {
          span: 6,
          type: 'select',
          label: 'Supplier.currentlyExport',
          key: 'currentlyExport',
          value: getValueOption(currentlyExport),
          handleChange: setExport,
          options: defaultOptions,
          disabled,
        },
        {
          span: 18,
          type: 'input',
          label: 'Supplier.exportDestination',
          key: 'exportDestination',
          value: exportDestination,
          hidden: !actuallyExport,
          required: true,
          disabled,
        },
      ],
    },
    {
      key: 4.9,
      value: [
        {
          type: 'title',
          value: 'Supplier.certifications',
          key: 'certifications',
        },
      ],
    },
    {
      key: 5.0,
      value: [
        {
          type: 'textarea',
          label: 'Supplier.nameCertification',
          key: 'nameCertification',
          value: nameCertification,
          disabled,
        },
      ],
    },
    {
      key: 5.1,
      value: [
        {
          type: 'title',
          value: 'Supplier.aditionalInformation',
          key: 'aditionalInformation',
        },
      ],
    },
    {
      key: 5.2,
      value: [
        {
          span: 12,
          type: 'select',
          label: 'Supplier.globalAgreement',
          key: 'globalAgreement',
          help: 'Supplier.globalAgreementHelp',
          value: getValueOption(globalAgreement),
          options: defaultOptions,
          disabled,
        },
      ],
    },
    {
      key: 5.3,
      value: [
        {
          span: 12,
          type: 'select',
          label: 'Supplier.chemicalSubstance',
          key: 'chemicalSubstance',
          value: getValueOption(chemicalSubstance),
          options: defaultOptions,
          disabled,
        },
      ],
    },
  ];
}

function noParticipateInfo(fields) {
  const {
    call,
    rules: { supplier: { readOnly } },
  } = fields;

  const {
    reasonForNotParticipation,
    nameWhoSayDontParticipate,
    emailWhoSayDontParticipate,
  } = call;

  const disabled = readOnly;
  return [
    {
      key: 1.0,
      value: [
        {
          disabled,
          type: 'textarea',
          label: 'Supplier.reasonForNotParticipation',
          key: 'reasonForNotParticipation',
          value: reasonForNotParticipation,
        },
      ],
    },
    {
      key: 2.0,
      value: [
        {
          disabled,
          type: 'input',
          label: 'Supplier.nameWhoSayDontParticipate',
          required: true,
          key: 'nameWhoSayDontParticipate',
          value: nameWhoSayDontParticipate,
        },
      ],
    },
    {
      key: 3.0,
      value: [
        {
          disabled,
          type: 'input',
          label: 'Supplier.emailWhoSayDontParticipate',
          required: true,
          key: 'emailWhoSayDontParticipate',
          value: emailWhoSayDontParticipate,
          rules: [
            { ...mailValitation },
          ],
        },
      ],
    },
  ];
}

export {
  generalInfo,
  noParticipateInfo,
};
