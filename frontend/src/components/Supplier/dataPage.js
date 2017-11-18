function generalInfo(categories, companyTypes, societyTypes) {
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
        },
        {
          span: 6,
          type: 'select',
          label: 'Tamaño de la empresa',
          key: 'tamanio',
          required: true,
          options: [
            {
              id: '1233',
              text: '111',
            },
          ],
        },
        {
          span: 12,
          type: 'text',
          label: '',
          value: 'Documentos oficiales: Por ejemplo, para Colombia adjuntar RUT y Camara de Comercio o Para Costa Rica adjuntar Cédula y Personaría Jurídica. (Máximo dos documentos) ',
          key: 'mainText',
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
        },
        {
          span: 6,
          type: 'input',
          label: 'Tipo de subcategoría',
          key: 'subCategory',
        },
        {
          span: 4,
          type: 'upload',
          key: 'file',
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
        },
        {
          span: 6,
          type: 'select',
          label: 'Tipo de compañía',
          key: 'companyType',
          options: companyTypes,
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
          options: [
            {
              id: 'si',
              text: 'Si',
            },
            {
              id: 'no',
              text: 'No',
            },
          ],
        },
        {
          span: 6,
          type: 'select',
          label: 'Tipo de sociedad',
          key: 'societyType',
          options: societyTypes,
        },
        {
          span: 6,
          type: 'input',
          label: 'Año de establecimiento',
          key: 'anio',
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
        },
        {
          span: 6,
          type: 'select',
          label: 'País',
          key: 'country',
          options: [],
        },
        {
          span: 6,
          type: 'input',
          label: 'Departamento',
          key: 'state',
        },
        {
          span: 6,
          type: 'input',
          label: 'Ciudad',
          key: 'city',
        },
      ],
    },
    {
      key: 1.7,
      value: [
        {
          span: 24,
          type: 'textarea',
          label: 'Sucursales, Plantas o Centros Alternos (Ubicación)',
          key: 'altenativesCenters',
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
        },
        {
          span: 6,
          type: 'input',
          label: 'Fax',
          key: 'fax',
        },
        {
          span: 6,
          type: 'input',
          label: 'E-mail',
          key: 'email',
        },
        {
          span: 6,
          type: 'input',
          label: 'ZIP Code',
          key: 'postalCode',
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
        },
        {
          span: 6,
          type: 'input',
          label: 'Cargo',
          key: 'position',
        },
        {
          span: 6,
          type: 'input',
          label: 'Teléfono',
          key: 'contactPhone',
          required: true,
        },
        {
          span: 6,
          type: 'input',
          label: 'E-mail',
          key: 'contactEmail',
          required: true,
        },
      ],
    },
  ];
}


const noParticipateInfo = [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'textarea',
        label: '¿Por qué no desea participar? ',
        key: 'answerFailed',
      },
    ],
  },
];
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
        span: 24,
        type: 'radio',
        label: 'Si es un Proveedor de Empaque ¿El empaque que nos suministra tiene contacto directo con el alimento?',
        key: 'packingProvider',
        options: [
          {
            id: 'si',
            text: 'Si',
          },
          {
            id: 'no',
            text: 'No',
          },
          {
            id: 'na',
            text: 'N/A',
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
        label: 'Informacion financiera',
        key: 'infoFinancial',
      },
    ],
  },
  {
    key: 2.7,
    value: [
      {
        span: 6,
        type: 'input',
        label: 'Valor en activos $',
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
        span: 6,
        type: 'input',
        label: 'Valor en ventas anual',
        key: 'salesYear',
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
        label: 'Informacion financiera',
        key: 'infoFinancial',
      },
    ],
  },
];

export {
  generalInfo,
  noParticipateInfo,
  comercialInfo,
};
