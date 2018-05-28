
const dataForm =
({
  masters,
  getFieldsByMaster,
  // form,
  fields,
  getValuesByField,
  // dataMaster,
  // cleanData
}) => {
  // const handleReset = () => {
  //   form.resetFields();
  //   form.setFieldsValue({ id: '' });
  //   cleanData();
  // };

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
          key: 'id',
          required: true,
          handleChange: getFieldsByMaster,
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
            handleChange: getValuesByField,
            required: true,
            value: '',
          },
        ],
      });
  }

  // if (Object.keys(fields).length !== 0) {
  //   formData.splice(2, 0,
  //     {
  //       key: 1.3,
  //       value: [
  //         {
  //           span: 24,
  //           type: 'select',
  //           options: fields,
  //           label: 'Campo',
  //           key: 'name',
  //           required: true,
  //           value: dataMaster.name,
  //         },
  //       ],
  //     });
  //   }
  //   {
  //     key: 2,
  //     justify: 'center',
  //     value: [
  //       {
  //         span: 2,
  //         type: 'button',
  //         label: 'Limpiar',
  //         key: 'clear',
  //         buttonType: 'primary',
  //         handleclick: handleReset,
  //       },
  //       {
  //         span: 4,
  //         type: 'button',
  //         label: 'Guardar',
  //         key: 'save',
  //         buttonType: 'primary',
  //         htmlType: 'submit',
  //       },
  //     ],
  //   });
  // }
  return formData;
};

export default dataForm;
