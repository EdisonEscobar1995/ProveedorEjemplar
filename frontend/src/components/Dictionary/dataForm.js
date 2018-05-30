
const dataForm =
({
  masters,
  getFieldsByMaster,
  form,
  fields,
  spanishText,
  getValuesByField,
  getTranslationBySpanishText,
  translate,
  cleanDataMaster,
}) => {
  const handleReset = () => {
    form.resetFields();
    cleanDataMaster();
  };

  const options = [
    {
      id: 'en',
      name: 'Inglés',
    },
  ];

  const formData = [
    {
      key: 1.1,
      value: [
        {
          span: 24,
          type: 'select',
          options: masters,
          label: 'Maestro',
          key: 'entity',
          required: true,
          handleSelect: getFieldsByMaster,
          value: '',
        },
      ],
    }, {
      key: 1.2,
      value: [
        {
          span: 24,
          type: 'select',
          options,
          label: 'Idioma',
          key: 'language',
          required: true,
          disabled: true,
          value: 'en',
        },
      ],
    }];

  if (fields && fields.length !== 0) {
    formData.splice(2, 0,
      {
        key: 1.3,
        value: [
          {
            span: 24,
            type: 'select',
            options: fields,
            label: 'Campo',
            key: 'name',
            handleSelect: getValuesByField,
            required: true,
            value: '',
          },
        ],
      });
  }

  if (spanishText.length !== 0) {
    formData.splice(3, 0,
      {
        key: 1.4,
        value: [
          {
            span: 24,
            type: 'select',
            options: spanishText,
            label: 'Texto en español',
            key: 'spanishText',
            handleSelect: getTranslationBySpanishText,
            required: true,
            value: '',
          },
        ],
      });
  }

  if (translate !== undefined) {
    formData.splice(4, 0,
      {
        key: 1.5,
        value: [
          {
            span: 24,
            type: 'input',
            label: 'Traducción',
            key: 'value',
            required: true,
            value: translate,
          },
        ],
      });
    formData.splice(5, 0,
      {
        key: 2,
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
          {
            span: 4,
            type: 'button',
            label: 'Guardar',
            key: 'save',
            buttonType: 'primary',
            htmlType: 'submit',
          },
        ],
      });
  }
  return formData;
};

export default dataForm;
