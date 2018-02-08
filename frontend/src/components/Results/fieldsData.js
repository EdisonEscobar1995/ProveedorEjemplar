const fieldsData = ({ data, getCriterionsByDimension, handleReset, getResults }) => {
  const {
    Call,
    Supply,
    Category,
    CompanySize,
    Supplier,
    Dimension,
    Criterion,
    Country,
  } = data;

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'call',
          value: Call ? Call[0].id : '',
          options: Call ? Call.map(item => ({
            id: item.id,
            name: item.year,
          })) : [],
          allowClear: false,
        },
        {
          span: 8,
          type: 'select',
          label: 'Tipo de suministro',
          key: 'supply',
          value: '',
          options: Supply,
        },
        {
          span: 8,
          type: 'select',
          label: 'Categoría',
          key: 'category',
          value: '',
          options: Category,
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Tamaño',
          key: 'companySize',
          value: '',
          options: CompanySize,
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          options: Supplier ? Supplier.map(item => ({
            id: item.id,
            name: item.businessName,
          })) : [],
        },
        {
          span: 8,
          type: 'select',
          label: 'Dimensión',
          key: 'dimension',
          value: '',
          options: Dimension,
          handleChange: (value) => {
            getCriterionsByDimension(value);
          },
          valuesToClean: {
            criterion: {
              value: '',
            },
          },
        },
      ],
    },
    {
      key: 1.3,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Criterio',
          key: 'criterion',
          value: '',
          options: Criterion,
        },
        {
          span: 8,
          type: 'select',
          label: 'País',
          key: 'country',
          value: '',
          options: Country,
        },
      ],
    },
    {
      key: 1.4,
      justify: 'center',
      value: [
        {
          span: 2,
          type: 'button',
          label: 'Limpiar',
          key: 'clear',
          buttonType: 'primary',
          handleclick: handleReset,
        }, {
          span: 2,
          type: 'button',
          label: 'Exportar a Excel',
          key: 'export',
          buttonType: 'primary',
          handleclick: getResults,
        },
      ],
    },
  ];
};

export default fieldsData;
