const fieldsData = ({ data, getPendings, filterPendings, handleReset, form }) => {
  const {
    years,
    suppliers,
    masters,
    states,
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
          handleChange: getPendings,
          allowClear: false,
          valuesToClean: {
            supply: { value: '' },
            category: { value: '' },
            companySize: { value: '' },
            supplier: { value: '' },
            surveyState: { value: '' },
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
            filterPendings(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Categoría',
          key: 'category',
          value: '',
          options: masters ? masters.Category : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), category: value };
            filterPendings(values);
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
          label: 'Tamaño',
          key: 'companySize',
          value: '',
          options: masters ? masters.CompanySize : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), companySize: value };
            filterPendings(values);
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
            filterPendings(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Estado',
          key: 'surveyState',
          value: '',
          options: states,
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), surveyState: value };
            filterPendings(values);
          },
        },
      ],
    },
    {
      key: 1.3,
      justify: 'center',
      value: [
        {
          span: 2,
          type: 'button',
          label: 'Limpiar',
          key: 'clear',
          buttonType: 'primary',
          handleclick: handleReset,
        },
      ],
    },
  ];
};

export default fieldsData;
