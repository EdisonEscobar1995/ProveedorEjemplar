const filtersData = ({ data, getParticipantsByYear, filterCallReport, form }) => {
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
          handleChange: getParticipantsByYear,
          allowClear: false,
          valuesToClean: {
            supply: {
              value: '',
            },
            companySize: {
              value: '',
            },
            participated: {
              value: '',
            },
            supplier: {
              value: '',
            },
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Tipo de suministro',
          key: 'supply',
          value: '',
          options: masters ? masters.Supply : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supply: value };
            filterCallReport(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Tamaño',
          key: 'companySize',
          value: '',
          options: masters ? masters.CompanySize : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), companySize: value };
            filterCallReport(values);
          },
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Participó',
          key: 'participated',
          value: '',
          options: masters ? [
            { id: 'true', name: 'Si' },
            { id: 'false', name: 'No' },
            { id: 'empty', name: 'Sin respuesta' },
          ] : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), participated: value };
            filterCallReport(values);
          },
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
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterCallReport(values);
          },
        },
      ],
    },
  ];
};

export default filtersData;
