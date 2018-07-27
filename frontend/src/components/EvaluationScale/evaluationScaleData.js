const formData = ({ record = {}, closeModal, masters }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Escala de evaluación',
      },
    ],
  },
  {
    key: 1.1,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Id',
        key: 'id',
        value: record.id,
        style: { display: 'none' },
      },
    ],
  },
  {
    key: 1.2,
    value: [
      {
        span: 24,
        type: 'select',
        label: 'Aplica a',
        key: 'applyTo',
        required: true,
        value: record.applyTo,
        options: masters.ApplyTo,
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Escala',
        key: 'name',
        required: true,
        whitespace: true,
        value: record.name,
      },
    ],
  },
  {
    key: 1.4,
    value: [
      {
        span: 24,
        type: 'inputNumber',
        max: 10000,
        label: 'Peso',
        key: 'score',
        required: true,
        value: record.score,
      },
    ],
  },
  {
    key: 1.5,
    value: [
      {
        span: 24,
        type: 'textarea',
        label: 'Ayuda',
        key: 'helpText',
        required: true,
        whitespace: true,
        value: record.helpText,
      },
    ],
  },
  {
    key: 1.6,
    justify: 'center',
    value: [
      {
        span: 4,
        type: 'button',
        label: 'Cancelar',
        key: 'cancel',
        buttonType: 'primary',
        handleclick: closeModal,
      }, {
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

export default formData;
