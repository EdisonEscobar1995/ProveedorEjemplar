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
];

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
          label: 'Nombre o Razón social',
          key: 'businessName',
          value: businessName,
          required: true,
          disabled: true,
        },
        {
          span: 6,
          type: 'select',
          label: 'Tamaño de la empresa',
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
          label: 'Suministros',
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
          label: 'Categoría',
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
          label: 'Tipo de subcategoría',
          key: 'idSubCategory',
          value: idSubCategory,
          options: subcategories,
          disabled,
        },
        {
          label: 'Documentos oficiales: Por ejemplo, para Colombia adjuntar RUT y Cámara de Comercio o Para Costa Rica adjuntar Cédula y Personaría Jurídica. (Máximo dos documentos)',
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
          label: 'Número Identificación Tributaria/NIT( Sin dígito Verificación) ',
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
          label: 'Tipo de compañía',
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
          label: '¿Es productor pecuario?',
          key: 'producerLivestok',
          value: getValueOption(producerLivestok),
          options: defaultOptions,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Tipo de sociedad',
          key: 'idSocietyType',
          value: idSocietyType,
          options: societyTypes,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Año de establecimiento',
          key: 'yearOfEstablishment',
          value: yearOfEstablishment,
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
          value: 'Ubicacion',
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
          label: 'Dirección principal',
          key: 'principalAdress',
          value: principalAdress,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'País',
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
          label: 'Departamento',
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
          label: 'Ciudad',
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
          label: 'Sucursales, Plantas o Centros Alternos (Ubicación)',
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
          value: 'Contacto',
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
          label: 'Teléfono(s)',
          key: 'telephone',
          value: telephone,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Fax',
          value: fax,
          key: 'fax',
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'E-mail',
          key: 'emails',
          value: emails,
          mode: 'tags',
          options: emails,
          noSearch: true,
          rules: [
            { ...mailValitationMultiple },
          ],
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'ZIP Code',
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
          value: 'Información Legal',
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
          label: 'Representante Legal',
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
          value: 'Información persona a contactar',
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
          label: 'Nombre completo',
          key: 'fullNameContact',
          value: fullNameContact,
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Cargo',
          key: 'jobPosition',
          value: jobPosition,
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Teléfono',
          key: 'phoneOfContact',
          value: phoneOfContact,
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'E-mail',
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
  const disabled = readOnly;
  return [
    {
      key: 1.0,
      value: [
        {
          disabled,
          type: 'textarea',
          label: '¿Por qué no desea participar? ',
          key: 'reasonForNotParticipation',
          value: call.reasonForNotParticipation,
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
  } = fields;
  const {
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
  } = supplier;
  const { uploadMaxFilesize, uploadExtensions } = system;
  const disabled = readOnly;
  return [
    {
      key: 2.4,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Sector al que pertenece la empresa',
          key: 'idSector',
          value: idSector,
          options: sectors,
          disabled,
        },
        {
          span: 8,
          type: 'input',
          label: 'Otro cual?',
          key: 'otherSector',
          value: otherSector,
          disabled,
        },
        {
          span: 8,
          type: 'input',
          label: 'Pagina web',
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
          label: 'Si es un Proveedor de Empaque ¿El empaque que nos suministra tiene contacto directo con el alimento?',
          key: 'packagingProvided',
          value: packagingProvided,
          required: true,
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
          value: 'Información financiera',
          key: 'infoFinancial',
        },
      ],
    },
    {
      key: 2.7,
      value: [
        {
          span: 3,
          type: 'select',
          label: 'Tipo',
          key: 'typeOfCurrencyValueAssets',
          value: typeOfCurrencyValueAssets,
          options: defaultMoneyType,
          disabled,
        },
        {
          span: 3,
          type: 'input',
          label: 'Valor en activos $',
          key: 'valueAssets',
          value: valueAssets,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
        {
          span: 12,
          type: 'upload',
          label: 'Soporte de balances o informes financieros del valor en activos',
          key: 'attachedFinancialReport',
          fileList: attachedFinancialReport,
          onChange: updateAttachment,
          onRemove: deleteAttachment,
          uploadMaxFilesize,
          uploadExtensions,
          required: true,
          disabled,
        },
        {
          span: 3,
          type: 'select',
          label: 'Tipo',
          key: 'typeOfCurrencyAnnualSales',
          value: typeOfCurrencyAnnualSales,
          options: defaultMoneyType,
          disabled,
        },
        {
          span: 3,
          type: 'input',
          label: 'Valor en ventas anual $',
          key: 'annualSalesValue',
          value: annualSalesValue,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
      ],
    },
    {
      key: 2.8,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Número de empleados directos',
          key: 'numberOfDirectEmployees',
          value: numberOfDirectEmployees,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
        {
          span: 6,
          type: 'input',
          label: 'Número de empleados subcontratados',
          key: 'numberOfSubContratedEmployees',
          value: numberOfSubContratedEmployees,
          disabled,
          rules: [
            { ...intValidation },
          ],
        },
        {
          span: 6,
          type: 'input',
          label: 'Total empleados (Directos + Subcontratados)',
          inputType: 'number',
          key: 'employeesTotal',
          value: numberOfSubContratedEmployees + numberOfDirectEmployees,
          disabled: true,
        },
        {
          span: 6,
          type: 'input',
          label: 'Participación ventas con el Grupo Nutresa (%)',
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
      key: 2.9,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Contacto con el grupo nutresa',
          key: 'infoFinancial',
          disabled,
        },
      ],
    },
    {
      key: 3.0,
      value: [
        {
          span: 8,
          type: 'input',
          label: 'Nombre de la persona contacto en Grupo Nutresa (Contacto Comercial y/o Negociador)',
          key: 'nameContactPersonInGroupNutresa',
          value: nameContactPersonInGroupNutresa,
          disabled,
        },
        {
          span: 8,
          type: 'input',
          inputType: 'mail',
          label: 'E-mail de la persona contacto en Grupo Nutresa',
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
          label: 'Teléfono de la persona contacto en Grupo Nutresa',
          key: 'phoneContactPersonInGroupNutresa',
          value: phoneContactPersonInGroupNutresa,
          disabled,
        },
      ],
    },
    {
      key: 3.1,
      value: [
        {
          type: 'title',
          value: 'Insumos',
          key: 'supplies',
        },
      ],
    },
    {
      key: 3.2,
      value: [
        {
          type: 'textarea',
          label: 'Describa el origen geográfico de los principales insumos que son utilizadas en los productos que nos provee',
          key: 'geograficDescriptionOfPrincipalMaterials',
          value: geograficDescriptionOfPrincipalMaterials,
          disabled,
        },
      ],
    },
    {
      key: 3.3,
      value: [
        {
          type: 'title',
          value: 'Exportacion',
          key: 'exports',
        },
      ],
    },
    {
      key: 3.4,
      value: [
        {
          span: 6,
          type: 'select',
          label: '¿Actualmente exporta?',
          key: 'currentlyExport',
          value: getValueOption(currentlyExport),
          options: defaultOptions,
          disabled,
        },
        {
          span: 18,
          type: 'input',
          label: 'Destinos de exportación',
          key: 'exportDestination',
          value: exportDestination,
          disabled,
        },
      ],
    },
    {
      key: 3.5,
      value: [
        {
          type: 'title',
          value: 'Certificaciones',
          key: 'certifications',
        },
      ],
    },
    {
      key: 3.6,
      value: [
        {
          type: 'textarea',
          label: 'Nombre las Certificaciones en Sostenibilidad, Calidad e Inocuidad certificadas en su compañía',
          key: 'nameCertification',
          value: nameCertification,
          disabled,
        },
      ],
    },
    {
      key: 3.7,
      value: [
        {
          type: 'title',
          value: 'Información adicional',
          key: 'aditionalInformation',
        },
      ],
    },
    {
      key: 3.8,
      value: [
        {
          span: 12,
          type: 'select',
          label: 'Su empresa es signataria del Pacto Global?',
          key: 'globalAgreement',
          help: 'El Pacto Global es una iniciativa voluntaria, en la cual las empresas se comprometen a alinear sus estrategias y operaciones con diez principios universalmente aceptados en cuatro áreas temáticas: Derechos humanos, Estándares laborales, Medio ambiente y anti-corrupción".',
          value: getValueOption(globalAgreement),
          options: defaultOptions,
          disabled,
        },
      ],
    },
    {
      key: 3.9,
      value: [
        {
          span: 12,
          type: 'select',
          label: 'Si es un Proveedor de sustancias químicas ¿La sustancias químicas que nos provee es considerada una sustancia química peligrosa?',
          key: 'chemicalSubstance',
          value: getValueOption(chemicalSubstance),
          options: defaultOptions,
          disabled,
        },
      ],
    },
    {
      key: 4.0,
      value:
      [
        {
          span: 12,
          type: 'title',
          value: 'Principales clientes',
          key: 'mainCustomers',
        },
      ],
    },
  ];
}

const mainCustomers = [
  {
    title: 'Nombre',
    key: 'name',
  },
  {
    title: 'Participación ventas por cliente (%)',
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
