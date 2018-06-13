import messages from '../../translation/messagesES';

const formData = ({ record = {}, closeModal }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Dimensiones de preguntas',
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
        rules: [
          { whitespace: true, message: messages['Validation.requiredField'] },
        ],
        value: record.name,
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
