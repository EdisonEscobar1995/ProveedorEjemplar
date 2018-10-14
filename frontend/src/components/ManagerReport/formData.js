const formData = ({
  data, getCriterionsByDimension, form, resetQuestions,
}) => {
  const {
    Call,
    Dimension,
    Criterion,
  } = data;

  const handleReset = () => {
    form.resetFields();
    resetQuestions();
  };

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
        {
          span: 8,
          type: 'select',
          label: 'Criterio',
          key: 'criterion',
          value: '',
          options: Criterion,
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
          label: 'Consultar',
          key: 'export',
          buttonType: 'primary',
          htmlType: 'submit',
        },
      ],
    },
  ];
};

export default formData;
