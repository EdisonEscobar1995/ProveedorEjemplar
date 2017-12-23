import { intValidation, mailValitation, mailValitationMultiple } from '../../utils/rules';

const defaultOptions = [
  {
    id: 'true',
    name: 'Si',
  },
  {
    id: 'false',
    name: 'No',
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
    supplier,
    readOnly,
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
    idCountry,
    idDepartment,
    idCity,
    branchOffice,
    telephone,
    fax,
    emails,
    emailOfContact,
    codeZip,
    nameLegalAgent,
    jobPosition,
    phoneOfContact,
    fullNameContact,
    document,
  } = supplier;
  const { uploadMaxFilesize, uploadExtensions } = system;
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
      key: 1.5,
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
      key: 1.6,
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
          label: 'Supplier.idCountry',
          key: 'idCountry',
          options: countries,
          disabled,
          value: idCountry,
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
      key: 1.7,
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
      key: 1.8,
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
      key: 1.9,
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
      key: 2.0,
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
      key: 2.1,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.nameLegalAgent',
          key: 'nameLegalAgent',
          value: nameLegalAgent,
          disabled,
        },
      ],
    },
    {
      key: 2.2,
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
      key: 2.3,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Supplier.fullNameContact',
          key: 'fullNameContact',
          value: fullNameContact,
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.jobPosition',
          key: 'jobPosition',
          value: jobPosition,
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.phoneOfContact',
          key: 'phoneOfContact',
          value: phoneOfContact,
          required: true,
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
  ];
}

function noParticipateInfo(fields) {
  const {
    call,
    readOnly,
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

function comercialInfo(fields) {
  const {
    supplier,
    readOnly,
    sectors,
    system,
    updateAttachment,
    deleteAttachment,
    setNumberOfDirectEmployees,
    setNumberOfSubContratedEmployees,
    setSector,
    setExport,
  } = fields;
  const {
    idCategory,
    idSector,
    otherSector,
    webSite,
    packagingProvided,
    valueAssets,
    typeOfCurrencyValueAssets,
    typeOfCurrencyAnnualSales,
    annualSalesValue,
    numberOfDirectEmployees,
    numberOfSubContratedEmployees,
    employeesTotal,
    participationInSalesWithGroupNutresa,
    nameContactPersonInGroupNutresa,
    emailContactPersonInGroupNutresa,
    phoneContactPersonInGroupNutresa,
    geograficDescriptionOfPrincipalMaterials,
    currentlyExport,
    nameCertification,
    exportDestination,
    globalAgreement,
    chemicalSubstance,
    attachedFinancialReport,
    actualSector,
    actuallyExport,
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
      key: 2.4,
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
      key: 2.5,
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
              name: 'Si',
            },
            {
              id: 'no',
              name: 'No',
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
          type: 'input',
          label: 'Supplier.numberOfDirectEmployees',
          key: 'numberOfDirectEmployees',
          value: numberOfDirectEmployees,
          handleChange: setNumberOfDirectEmployees,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.numberOfSubContratedEmployees',
          key: 'numberOfSubContratedEmployees',
          value: numberOfSubContratedEmployees,
          handleChange: setNumberOfSubContratedEmployees,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
        {
          span: 6,
          type: 'input',
          label: 'Supplier.employeesTotal',
          inputType: 'number',
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
          value: 'Supplier.contactNutresaGroup',
          key: 'contactNutresaGroup',
          disabled,
        },
      ],
    },
    {
      key: 3.1,
      value: [
        {
          span: 8,
          type: 'input',
          label: 'Supplier.nameContactPersonInGroupNutresa',
          key: 'nameContactPersonInGroupNutresa',
          value: nameContactPersonInGroupNutresa,
          disabled,
        },
        {
          span: 8,
          type: 'input',
          inputType: 'mail',
          label: 'Supplier.emailContactPersonInGroupNutresa',
          key: 'emailContactPersonInGroupNutresa',
          value: emailContactPersonInGroupNutresa,
          disabled,
          rules: [
            { ...mailValitation },
          ],
        },
        {
          span: 8,
          type: 'input',
          inputType: 'mail',
          label: 'Supplier.phoneContactPersonInGroupNutresa',
          key: 'phoneContactPersonInGroupNutresa',
          value: phoneContactPersonInGroupNutresa,
          disabled,
        },
      ],
    },
    {
      key: 3.2,
      value: [
        {
          type: 'title',
          value: 'Supplier.supplies',
          key: 'supplies',
        },
      ],
    },
    {
      key: 3.3,
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
      key: 3.4,
      value: [
        {
          type: 'title',
          value: 'Supplier.exports',
          key: 'exports',
        },
      ],
    },
    {
      key: 3.5,
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
      key: 3.6,
      value: [
        {
          type: 'title',
          value: 'Supplier.certifications',
          key: 'certifications',
        },
      ],
    },
    {
      key: 3.7,
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
      key: 3.8,
      value: [
        {
          type: 'title',
          value: 'Supplier.aditionalInformation',
          key: 'aditionalInformation',
        },
      ],
    },
    {
      key: 3.9,
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
      key: 4.0,
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

const mainCustomers = [
  {
    title: 'Supplier.principalCustomer.name',
    key: 'name',
  },
  {
    title: 'Supplier.principalCustomer.percentageOfParticipationInSales',
    key: 'percentageOfParticipationInSales',
    rules: [
      { ...intValidation },
    ],
  },
];

export {
  generalInfo,
  noParticipateInfo,
  comercialInfo,
  mainCustomers,
};
