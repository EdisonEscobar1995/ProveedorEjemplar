const formData = ({ record = {}, closeModal }) => [
  {
    key: 2.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Tipos de compañía',
      },
    ],
  },
  {
    key: 2.1,
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
    key: 2.5,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Nombre del tipo de compañía',
        key: 'name',
        required: true,
        value: record.name,
      },
    ],
  },
  {
    key: 2.8,
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
