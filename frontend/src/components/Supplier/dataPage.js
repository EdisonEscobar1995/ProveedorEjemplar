const defaultOptions = [
  {
    id: 'si',
    name: 'Si',
  },
  {
    id: 'no',
    name: 'No',
  },
];
function getValueOption(value) {
  if (value) {
    return (value ? 'si' : 'no');
  }
  return '';
}
function generalInfo(fields) {
  const {
    supplier,
    call,
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
    getDataDepartmentsByCountry,
    cities,
    getDataCitiesByDepartment,
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
  } = supplier;
  const disabled = call.lockedByModification;
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
          disabled,
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
        },
        {
          span: 6,
          type: 'select',
          label: 'Suministros',
          value: idSupply,
          key: 'idSupply',
          required: true,
          disabled,
          options: supplies,
          handleChange: (value) => {
            const data = {
              id: value,
            };
            getDataCategoryBySuply(data);
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
          handleChange: (value) => {
            const data = {
              id: value,
            };
            getDataSubCategoryByCategory(data);
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
          label: 'Documentos oficiales: Por ejemplo, para Colombia adjuntar RUT y Camara de Comercio o Para Costa Rica adjuntar Cédula y Personaría Jurídica. (Máximo dos documentos)',
          span: 12,
          type: 'upload',
          name: 'file',
          action: 'http://jcgonzalez.cognox.com/Aplicaciones/ProveedorEjemplar/exemplaryProvider.nsf/xsp/Attachment?action=save',
          key: 'file',
          disabled,
        },
      ],
    },
    {
      key: 1.3,
      value: [
        {
          span: 6,
          type: 'input',
          inputType: 'number',
          label: 'Número Identificación Tributaria/NIT( Sin dígito Verificación) ',
          key: 'nit',
          value: nit,
          required: true,
          disabled,
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
          handleChange: (value) => {
            const data = {
              id: value,
            };
            getDataDepartmentsByCountry(data);
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
          handleChange: (value) => {
            const data = {
              id: value,
            };
            getDataCitiesByDepartment(data);
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
          type: 'input',
          label: 'E-mail',
          key: 'emails',
          value: emails,
          inputType: 'mail',
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'ZIP Code',
          key: 'codeZip',
          value: codeZip,
          disabled,
        },
      ],
    },
    {
      key: 2.0,
      value: [
        {
          span: 12,
          type: 'title',
          value: 'Informacion Legal',
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
          value: 'Informacion persona a contactar',
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
        },
      ],
    },
  ];
}

function noParticipateInfo(fields) {
  const {
    call,
  } = fields;
  const disabled = call.lockedByModification;
  return [
    {
      key: 1.0,
      value: [
        {
          disabled,
          type: 'textarea',
          label: '¿Por qué no desea participar? ',
          key: 'reasonForNotParticipation',
          required: true,
          value: call.reasonForNotParticipation,
        },
      ],
    },
  ];
}

function comercialInfo(fields) {
  const { supplier } = fields;
  const {
    idSector,
    otherSector,
    webSite,
    packagingProvided,
    valueAssets,
    valueAssetsOption,
    annualSalesOption,
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
  } = supplier;
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
          options: [],
        },
        {
          span: 8,
          type: 'input',
          label: 'Otro cual?',
          key: 'otherSector',
          value: otherSector,
        },
        {
          span: 8,
          type: 'input',
          label: 'Pagina web',
          key: 'webSite',
          value: webSite,
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
          value: 'Informacion financiera',
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
          label: 'Valor en activos $',
          key: 'valueAssetsOption',
          value: valueAssetsOption,
          required: true,
          options: [],
        },
        {
          span: 3,
          type: 'input',
          key: 'valueAssets',
          value: valueAssets,
          required: true,
        },
        {
          span: 12,
          type: 'upload',
          label: 'Soporte de balances o informes financieros del valor en activos',
          key: 'support',
          required: true,
        },
        {
          span: 3,
          type: 'select',
          label: 'Valor en ventas anual',
          key: 'annualSalesOption',
          value: annualSalesOption,
          required: true,
          options: [],
        },
        {
          span: 3,
          type: 'input',
          key: 'annualSalesValue',
          value: annualSalesValue,
          required: true,
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
        },
        {
          span: 6,
          type: 'input',
          label: 'Número de empleados subcontratados',
          key: 'numberOfSubContratedEmployees',
          value: numberOfSubContratedEmployees,
        },
        {
          span: 6,
          type: 'input',
          label: 'Total empleados (Directos + Subcontratados)',
          key: 'employeesTotal',
          value: numberOfSubContratedEmployees + numberOfDirectEmployees,
        },
        {
          span: 6,
          type: 'input',
          label: 'Participación ventas por cliente ',
          key: 'participationInSalesWithGroupNutresa',
          value: participationInSalesWithGroupNutresa,
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
        },
        {
          span: 8,
          type: 'input',
          inputType: 'mail',
          label: 'E-mail de la persona contacto en Grupo Nutresa',
          key: 'emailContactPersonInGroupNutresa',
          value: emailContactPersonInGroupNutresa,
        },
        {
          span: 8,
          type: 'input',
          inputType: 'mail',
          label: 'Teléfono de la persona contacto en Grupo Nutresa',
          key: 'phoneContactPersonInGroupNutresa',
          value: phoneContactPersonInGroupNutresa,
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
        },
        {
          span: 18,
          type: 'input',
          label: 'Destinos de exportación',
          key: 'exportDestination',
          value: exportDestination,
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
        },
      ],
    },
    {
      key: 3.7,
      value: [
        {
          type: 'title',
          value: 'Informacion adicional',
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
          value: getValueOption(globalAgreement),
          options: defaultOptions,
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
          valie: getValueOption(chemicalSubstance),
          options: defaultOptions,
        },
      ],
    },
  ];
}

export {
  generalInfo,
  noParticipateInfo,
  comercialInfo,
};
