const generalInfo =
({
  editData,
  addDataOptions,
  updateDataOptions,
  deleteDataOptions,
  dimension,
  criterion,
  questions,
  items,
  options,
  changeAnswerType,
  changeDependingQuestion,
  changeDimension,
  changeCriterion,
  changeQuestion,
  changeHelpText,
  changeItems,
  switchRequired,
  switchRequiredAttachment,
}) => {
  const typeAnswer = [
    {
      id: 'Abierta',
      name: 'Abierta',
    },
    {
      id: 'Cerrada',
      name: 'Cerrada',
    },
  ];

  const colummnsTable = [{
    title: 'Opción de respuesta',
    key: 'wording',
  }, {
    title: 'Peso',
    key: 'score',
  }];

  const onChangeAnswerType = (value) => {
    changeAnswerType(value);
  };

  const onChangeDependingQuestion = (value) => {
    changeDependingQuestion(value);
  };

  const formData = [
    {
      key: 1,
      value: [
        {
          span: 24,
          type: 'input',
          label: 'Id',
          key: 'id',
          value: editData ? editData.id : '',
          style: { display: 'none' },
        },
      ],
    },
    {
      key: 1.1,
      value: [
        {
          span: 7,
          type: 'select',
          options: dimension,
          label: 'Dimensión',
          key: 'idDimension',
          required: true,
          handleChange: changeDimension,
          value: editData ? editData.idDimension : '',
        },
        {
          span: 7,
          type: 'select',
          options: criterion,
          label: 'Criterio',
          key: 'idCriterion',
          handleChange: changeCriterion,
          value: editData ? editData.idCriterion : '',
        },
        {
          span: 4,
          type: 'switch',
          label: '¿Requiere soporte?',
          key: 'requireAttachment',
          required: true,
          handleChange: switchRequiredAttachment,
          value: editData && editData.requireAttachment,
        },
        {
          span: 6,
          type: 'select',
          options: typeAnswer,
          label: 'Tipo de respuesta',
          key: 'type',
          required: true,
          handleChange: onChangeAnswerType,
          value: editData ? editData.type : '',
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 24,
          type: 'textarea',
          label: 'Pregunta',
          key: 'wording',
          required: true,
          handleChange: changeQuestion,
          value: editData ? editData.wording : '',
        },
      ],
    },
    {
      key: 1.5,
      value: [
        {
          span: 10,
          type: 'input',
          label: 'Texto de ayuda de las preguntas',
          key: 'helpText',
          handleChange: changeHelpText,
          value: editData ? editData.helpText : '',
        },
        {
          span: 10,
          type: 'select',
          options: questions,
          label: 'Esta pregunta depende de',
          key: 'dependOfQuestion',
          handleChange: onChangeDependingQuestion,
          value: editData && editData.dependOfQuestion,
        },
        {
          span: 4,
          type: 'switch',
          label: '¿Es requerido?',
          key: 'required',
          required: true,
          handleChange: switchRequired,
          value: editData && editData.required,
        },
      ],
    },
    {
      key: 2,
      justify: 'center',
      value: [
        {
          span: 4,
          type: 'button',
          label: 'Guardar',
          key: 'save',
          buttonType: 'primary',
          htmlType: 'submit',
        },
      ],
    },
  ];

  if (editData.type === 'Cerrada') {
    formData.splice(3, 0, {
      key: 1.3,
      value: [
        {
          span: 24,
          type: 'table',
          label: 'Pregunta',
          key: 'options',
          required: true,
          disabled: false,
          readonly: false,
          colummns: colummnsTable,
          value: options,
          addData: addDataOptions,
          updateField: updateDataOptions,
          deleteData: deleteDataOptions,
        },
      ],
    });
  }

  const boolean = !!editData.dependOfQuestion;
  if (boolean && items.length > 0) {
    let number;
    if (formData.length === 6) {
      number = 5;
    } else {
      number = 4;
    }
    formData.splice(number, 0, {
      key: 1.6,
      value: [
        {
          span: 24,
          type: 'radio',
          label: 'Items',
          options: items,
          key: 'dependOfOptionId',
          size: 'small',
          required: true,
          handleChange: changeItems,
          value: editData ? editData.dependOfOptionId : '',
        },
      ],
    });
  }

  return formData;
};

export default generalInfo;
