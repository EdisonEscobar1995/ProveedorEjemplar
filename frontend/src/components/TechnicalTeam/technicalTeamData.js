const formData = ({ record = {}, closeModal, masters, getCategoryBySupply }) => [
  {
    key: 1.0,
    value: [
      {
        span: 24,
        type: 'title',
        value: 'Negociador',
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
        options: masters.Supply,
        label: 'Suministro',
        key: 'idSupply',
        required: true,
        value: record.idSupply,
        handleChange: (value) => {
          getCategoryBySupply(value);
        },
        valuesToClean: {
          idCategory: {
            value: '',
          },
        },
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        span: 24,
        type: 'select',
        options: masters.FilteredCategory,
        label: 'Categoría',
        key: 'idCategory',
        required: true,
        value: record.idCategory,
      },
    ],
  },
  {
    key: 1.4,
    value: [
      {
        span: 24,
        type: 'select',
        options: masters.Country,
        label: 'País',
        key: 'idCountry',
        required: true,
        value: record.idCountry,
      },
    ],
  },
  {
    key: 1.5,
    value: [
      {
        span: 24,
        type: 'select',
        options: masters.User,
        label: 'Negociador',
        key: 'idUser',
        required: true,
        value: record.idUser,
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
