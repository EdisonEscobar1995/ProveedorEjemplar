const filtersInfo = (data) => {
  const states = [
    {
      id: 'Notificado',
      name: 'Notificado',
    },
    {
      id: 'Bloqueado',
      name: 'Bloqueado',
    },
  ];
  const {
    years,
    suppliers,
    masters,
  } = data;

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'year',
          value: years && years.length > 0 ? years[0] : '',
          options: years ? years.map(item => ({ id: item, name: item })) : [],
        },
        {
          span: 8,
          type: 'select',
          label: 'Tipo de suministro',
          key: 'supply',
          value: '',
          options: masters ? masters.Supply : [],
        },
        {
          span: 8,
          type: 'select',
          label: 'Categoría',
          key: 'category',
          value: '',
          options: masters ? masters.Category : [],
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'País',
          key: 'country',
          value: '',
          options: masters ? masters.Country : [],
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          options: suppliers ? suppliers.map((item) => {
            item.name = item.businessName;
            return item;
          }) : [],
        },
        {
          span: 8,
          type: 'select',
          label: 'Estado',
          key: 'state',
          value: '',
          options: states,
        },
      ],
    },
  ];
};

export default filtersInfo;
