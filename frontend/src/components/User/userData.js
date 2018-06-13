import messages from '../../translation/messagesES';

const formData = ({
  record = {}, closeModal, masters, getUsersByKey, fetching,
}) => [
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
        type: 'select',
        mode: 'combobox',
        autoComplete: true,
        label: 'Nombre',
        key: 'name',
        value: record.name,
        required: true,
        rules: [
          { whitespace: true, message: messages['Validation.requiredField'] },
        ],
        options: masters.Users,
        onSearch: getUsersByKey,
        fetching,
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
        rules: [
          { whitespace: true, message: messages['Validation.requiredField'] },
        ],
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
        mode: 'default',
        options: masters.Roles,
        label: 'Rol',
        key: 'idRols',
        required: true,
        value: record.idRols && record.idRols[0],
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
