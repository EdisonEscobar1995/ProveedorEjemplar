const formData = ({ record = {}, closeModal }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Porcentaje dimensión',
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
        type: 'input',
        label: 'Nombre de la dimensión',
        key: 'name',
        required: true,
        whitespace: true,
        value: record.name,
        disabled: true,
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        span: 24,
        type: 'inputNumber',
        label: 'Porcentaje',
        key: 'percent',
        max: 100,
        formatter: value => `${value}%`,
        parser: value => value.replace('%', ''),
        required: true,
        value: record.percent,
      },
    ],
  },
  {
    key: 1.4,
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
