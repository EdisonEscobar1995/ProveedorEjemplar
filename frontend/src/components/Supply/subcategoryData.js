const formData = ({ record = {}, parentId, closeModal }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Subcategoría',
      },
    ],
  },
  {
    key: 1.1,
    value: [
      {
        span: 12,
        type: 'input',
        label: 'Id categoría',
        key: 'idCategory',
        value: record.idCategory || parentId,
        style: { display: 'none' },
      },
      {
        span: 12,
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
        whitespace: true,
        value: record.name,
      },
    ],
  },
  {
    key: 1.3,
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
