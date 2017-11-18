const generalInfo = [
  {
    key: 1.1,
    value: [
      {
        span: 6,
        type: 'input',
        label: 'Nombre o razon social',
        key: 'name',
      },
      {
        span: 6,
        type: 'select',
        label: 'Tamanio de la empresa',
        key: 'tamanio',
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
        value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos commodi recusandae aliquid, tempora quia exercitationem quidem ullam ex corporis',
        key: 'mainText',
      },
    ],
  },
  {
    key: 1.2,
    value: [
      {
        span: 6,
        type: 'input',
        label: 'Categoria',
        key: 'category',
      },
      {
        span: 6,
        type: 'input',
        label: 'SubCategoria',
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
        label: 'Numero de identificacion',
        key: 'identityNumber',
      },
      {
        span: 6,
        type: 'input',
        label: 'Tipo de compania',
        key: 'companyType',
      },
    ],
  },
  {
    key: 1.4,
    value: [
      {
        span: 6,
        type: 'input',
        label: 'Es productor pecuario?',
        key: 'productorPecuario',
      },
      {
        span: 6,
        type: 'input',
        label: 'Tipo de sociedad',
        key: 'societyType',
      },
      {
        span: 6,
        type: 'input',
        label: 'Anio establecimiento',
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
        label: 'Direccion Principal',
        key: 'mainAddress',
      },
      {
        span: 6,
        type: 'input',
        label: 'Pais',
        key: 'country',
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
        label: 'Sucursales plantas o centros alternos',
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
        label: 'Telefono',
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
        label: 'Codigo portal',
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
        label: 'Telefono',
        key: 'contactPhone',
      },
      {
        span: 6,
        type: 'input',
        label: 'E-mail',
        key: 'contactEmail',
      },
    ],
  },
];

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
        options: [
          {
            id: '1111111',
            text: '111',
          },
        ],
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
      },
      {
        span: 12,
        type: 'upload',
        label: 'Soporte de balances o informes financieros del valor en activos',
        key: 'support',
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
];

export {
  generalInfo,
  noParticipateInfo,
  comercialInfo,
};
