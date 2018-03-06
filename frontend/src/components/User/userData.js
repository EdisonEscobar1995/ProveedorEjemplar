const formData = ({ record = {}, closeModal, masters }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Usuario',
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
        label: 'Nombre',
        key: 'name',
        required: true,
        value: record.name,
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Correo',
        key: 'email',
        required: true,
        value: record.email,
      },
    ],
  },
  {
    key: 1.4,
    value: [
      {
        span: 24,
        type: 'select',
        mode: 'multiple',
        options: masters.Roles,
        label: 'Roles',
        key: 'idRols',
        required: true,
        value: record.idRols,
      },
    ],
  },
  {
    key: 1.5,
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
