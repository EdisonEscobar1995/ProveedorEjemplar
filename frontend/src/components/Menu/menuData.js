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
      {
        span: 24,
        type: 'input',
        label: 'Tipo',
        key: 'type',
        value: 'menu',
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
        key: 'categoryName',
        required: true,
        value: record.categoryName,
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        span: 24,
        type: 'inputNumber',
        label: 'Índice',
        key: 'categoryNumber',
        value: record.categoryNumber,
      },
    ],
  },
  {
    key: 1.5,
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
    key: 1.6,
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
    key: 1.7,
    value: [
      {
        span: 24,
        type: 'select',
        mode: 'multiple',
        options: masters.Rol,
        label: 'Roles',
        key: 'idsRol',
        required: true,
        value: record.idsRol,
      },
    ],
  },
  {
    key: 1.8,
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
