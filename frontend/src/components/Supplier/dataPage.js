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
function generalInfo(fields) {
  const {
    supplier,
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
  const disabled = supplier.lockedByModification;
  return [
    {
      key: 1.1,
      value: [
        {
          span: 6,
          type: 'input',
          label: 'Nombre o Razón social',
          key: 'name',
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Tamaño de la empresa',
          key: 'tamanio',
          required: true,
          options: companySizes,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Suministros',
          key: 'supplies',
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
          key: 'category',
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
          key: 'subCategory',
          options: subcategories,
          disabled,
        },
        {
          label: 'Documentos oficiales: Por ejemplo, para Colombia adjuntar RUT y Camara de Comercio o Para Costa Rica adjuntar Cédula y Personaría Jurídica. (Máximo dos documentos)',
          span: 12,
          type: 'upload',
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
          key: 'identityNumber',
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Tipo de compañía',
          key: 'companyType',
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
          key: 'productorPecuario',
          options: defaultOptions,
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'Tipo de sociedad',
          key: 'societyType',
          options: societyTypes,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Año de establecimiento',
          key: 'anio',
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
          key: 'mainAddress',
          disabled,
        },
        {
          span: 6,
          type: 'select',
          label: 'País',
          key: 'country',
          options: countries,
          disabled,
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
          key: 'department',
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
          key: 'city',
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
          key: 'altenativesCenters',
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
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Fax',
          key: 'fax',
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'E-mail',
          key: 'email',
          inputType: 'mail',
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'ZIP Code',
          key: 'postalCode',
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
          key: 'legalAgent',
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
          key: 'fullName',
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Cargo',
          key: 'position',
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'Teléfono',
          key: 'contactPhone',
          required: true,
          disabled,
        },
        {
          span: 6,
          type: 'input',
          label: 'E-mail',
          key: 'contactEmail',
          required: true,
          disabled,
        },
      ],
    },
  ];
}

function noParticipateInfo(fields) {
  const {
    supplier,
  } = fields;
  const disabled = supplier.lockedByModification;
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
          value: supplier.reasonForNotParticipation,
        },
      ],
    },
  ];
}
const comercialInfo = [
  {
    key: 2.4,
    value: [
      {
        span: 8,
        type: 'select',
        label: 'Sector al que pertenece la empresa',
        key: 'sector',
        options: [],
      },
      {
        span: 8,
        type: 'input',
        label: 'Otro cual?',
        key: 'other',
      },
      {
        span: 8,
        type: 'input',
        label: 'Pagina web',
        key: 'webPage',
      },
    ],
  },
  {
    key: 2.5,
    value: [
      {
        type: 'radio',
        label: 'Si es un Proveedor de Empaque ¿El empaque que nos suministra tiene contacto directo con el alimento?',
        key: 'packingProvider',
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
        key: 'activeValueOption',
        required: true,
        options: [],
      },
      {
        span: 3,
        type: 'input',
        key: 'activeValue',
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
        key: 'salesYearOption',
        required: true,
        options: [],
      },
      {
        span: 3,
        type: 'input',
        key: 'salesYear',
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
        key: 'activeValue',
      },
      {
        span: 6,
        type: 'input',
        label: 'Número de empleados subcontratados',
        key: 'employeesNumber',
      },
      {
        span: 6,
        type: 'input',
        label: 'Total empleados (Directos + Subcontratados)',
        key: 'employeesTotal',
      },
      {
        span: 6,
        type: 'input',
        label: 'Participación ventas por cliente ',
        key: 'salesByCustomer',
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
        key: 'contactName',
      },
      {
        span: 8,
        type: 'input',
        inputType: 'mail',
        label: 'E-mail de la persona contacto en Grupo Nutresa',
        key: 'contactMail',
      },
      {
        span: 8,
        type: 'input',
        inputType: 'mail',
        label: 'Teléfono de la persona contacto en Grupo Nutresa',
        key: 'contactPhone',
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
        key: 'geographicOrigin',
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
        key: 'export',
        options: defaultOptions,
      },
      {
        span: 18,
        type: 'input',
        label: 'Destinos de exportación',
        key: 'exportDestination',
      },
    ],
  },
  {
    key: 3.4,
    value: [
      {
        type: 'title',
        value: 'Certificaciones',
        key: 'certifications',
      },
    ],
  },
  {
    key: 3.5,
    value: [
      {
        type: 'textarea',
        label: 'Nombre las Certificaciones en Sostenibilidad, Calidad e Inocuidad certificadas en su compañía',
        key: 'cetificationsName',
      },
    ],
  },
  {
    key: 3.6,
    value: [
      {
        type: 'title',
        value: 'Informacion adicional',
        key: 'aditionalInformation',
      },
    ],
  },
  {
    key: 3.7,
    value: [
      {
        span: 12,
        type: 'select',
        label: 'Su empresa es signataria del Pacto Global?',
        key: 'globalImpact',
        options: defaultOptions,
      },
    ],
  },
  {
    key: 3.8,
    value: [
      {
        span: 12,
        type: 'select',
        label: 'Si es un Proveedor de sustancias químicas ¿La sustancias químicas que nos provee es considerada una sustancia química peligrosa?',
        key: 'dangerous',
        options: defaultOptions,
      },
    ],
  },
];


export {
  generalInfo,
  noParticipateInfo,
  comercialInfo,
};
