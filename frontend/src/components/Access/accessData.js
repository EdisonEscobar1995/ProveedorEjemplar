const formData = ({ record = {}, closeModal }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Accesso',
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
        label: 'Api',
        key: 'api',
        required: true,
        value: record.api,
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Acción',
        key: 'action',
        required: true,
        value: record.action,
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
