const filtersData = ({ data, getSurveys, filterSurveys, form }) => {
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
          handleChange: getSurveys,
          allowClear: false,
          valuesToClean: {
            supply: {
              value: '',
            },
            category: {
              value: '',
            },
            companySize: {
              value: '',
            },
            surveyState: {
              value: '',
            },
            supplier: {
              value: '',
            },
            country: {
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
            filterSurveys(values);
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
            filterSurveys(values);
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
            filterSurveys(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Estado',
          key: 'surveyState',
          value: '',
          options: masters ? masters.State : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), surveyState: value };
            filterSurveys(values);
          },
        }, {
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
            filterSurveys(values);
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
          label: 'País',
          key: 'country',
          value: '',
          options: masters ? masters.Country : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), country: value };
            filterSurveys(values);
          },
        },
      ],
    },
  ];
};

export default filtersData;
