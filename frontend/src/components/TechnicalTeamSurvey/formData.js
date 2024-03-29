const formData = ({ data, getTechnicalTeamSurvey, filterTechnicalTeamSurvey, form }) => {
  const {
    years,
    suppliers,
    masters,
    supplierId,
  } = data;

  const handleReset = () => {
    form.resetFields();
    getTechnicalTeamSurvey();
  };

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
          handleChange: getTechnicalTeamSurvey,
          allowClear: false,
          valuesToClean: {
            supply: { value: '' },
            category: { value: '' },
            country: { value: '' },
            supplier: { value: '' },
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
            filterTechnicalTeamSurvey(values);
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
            filterTechnicalTeamSurvey(values);
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
          label: 'País',
          key: 'country',
          value: '',
          options: masters ? masters.Country : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), country: value };
            filterTechnicalTeamSurvey(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: supplierId,
          options: suppliers ? suppliers.map((item) => {
            item.name = item.businessName;
            return item;
          }) : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterTechnicalTeamSurvey(values);
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
            filterTechnicalTeamSurvey(values);
          },
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
        },
      ],
    },
  ];
};

export default formData;
