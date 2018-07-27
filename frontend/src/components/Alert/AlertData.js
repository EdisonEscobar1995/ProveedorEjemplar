const formData = ({ record = {}, closeModal }) => {
  const options = [
    {
      id: 'Si',
      name: 'Si',
    },
    {
      id: 'No',
      name: 'No',
    },
  ];
  return [
    {
      key: 1.0,
      value: [
        {
          span: 24,
          type: 'title',
          value: 'Alertas',
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
      key: 1.8,
      value: [
        {
          span: 24,
          type: 'input',
          label: 'Nombre',
          key: 'name',
          required: true,
          whitespace: true,
          value: record.name,
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 24,
          type: 'radio',
          label: 'Activa',
          options,
          key: 'active',
          required: true,
          value: record.active ? 'Si' : 'No',
        },
      ],
    },
    {
      key: 1.3,
      value: [
        {
          span: 24,
          type: 'input',
          label: 'Asunto',
          key: 'subject',
          required: true,
          whitespace: true,
          value: record.subject,
        },
      ],
    },
    {
      key: 1.4,
      value: [
        {
          span: 24,
          type: 'textarea',
          label: 'Mensaje',
          key: 'message',
          required: true,
          whitespace: true,
          value: record.message,
        },
      ],
    },
    {
      key: 1.5,
      value: [
        {
          span: 24,
          type: 'inputNumber',
          label: 'Días para alarma',
          key: 'days',
          required: true,
          whitespace: true,
          value: record.days,
        },
      ],
    },
    {
      key: 1.6,
      value: [
        {
          span: 24,
          type: 'input',
          label: 'ShortName',
          key: 'shortName',
          value: record.shortName,
          style: { display: 'none' },
        },
      ],
    },
    {
      key: 1.7,
      value: [
        {
          span: 24,
          type: 'input',
          label: 'dateExecuted',
          key: 'dateExecuted',
          value: record.dateExecuted,
          style: { display: 'none' },
        },
      ],
    },
    {
      key: 2.0,
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
};

export default formData;
