const formData = ({ record = {}, closeModal, masters }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Menú',
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
        options: masters.Category,
        label: 'Categoría',
        key: 'categoryNumber',
        required: true,
        value: record.categoryNumber,
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Título',
        key: 'title',
        value: record.title,
      },
    ],
  },
  {
    key: 1.4,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Código',
        key: 'name',
        value: record.name,
      },
    ],
  },
  {
    key: 1.5,
    value: [
      {
        span: 24,
        type: 'select',
        mode: 'multiple',
        options: masters.Roles,
        label: 'Roles',
        key: 'idsRol',
        required: true,
        value: record.idsRol,
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
