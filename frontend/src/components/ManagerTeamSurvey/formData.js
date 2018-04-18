const formData = ({ data, getManagerTeamSurvey, filterManagerTeamSurvey, form }) => {
  const {
    years,
    suppliers,
    masters,
  } = data;

  const handleReset = () => {
    form.resetFields();
    getManagerTeamSurvey();
  };

  const getUniqueSuppliers = () => {
    const suppliersAux = [];
    const idSuppliers = [];
    if (suppliers) {
      suppliers.forEach((item) => {
        const idSupplier = item.id;
        if (idSuppliers.indexOf(idSupplier) === -1) {
          item.name = item.businessName;
          idSuppliers.push(idSupplier);
          suppliersAux.push(item);
        }
      });
    }
    return suppliersAux;
  };

  const FormData = [
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
          handleChange: getManagerTeamSurvey,
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
            filterManagerTeamSurvey(values);
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
            filterManagerTeamSurvey(values);
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
            filterManagerTeamSurvey(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          options: getUniqueSuppliers(),
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterManagerTeamSurvey(values);
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

  if (data.finishVisible) {
    FormData[1].value.splice(1, 0, {
      span: 8,
      type: 'select',
      label: 'Gerente',
      key: 'managers',
      value: '',
      options: masters ? masters.Managers : [],
      handleChange: (value) => {
        const values = { ...form.getFieldsValue(), managers: value };
        filterManagerTeamSurvey(values);
      },
    });

    FormData.splice(2, 0,
      {
        key: 1.3,
        value: [
          {
            span: 8,
            type: 'select',
            label: 'Estado',
            key: 'states',
            value: '',
            options: masters ? masters.State : [],
            handleChange: (value) => {
              const values = { ...form.getFieldsValue(), states: value };
              filterManagerTeamSurvey(values);
            },
          },
        ],
      });
  }

  return FormData;
};

export default formData;
