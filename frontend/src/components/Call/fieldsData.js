const fieldsData = () => ([
  {
    key: 1.1,
    value: [
      {
        span: 6,
        type: 'input',
        label: 'Código SAP',
        key: 'sapCode',
        value: '',
      },
      {
        span: 6,
        type: 'input',
        label: 'NIT',
        key: 'nit',
        value: '',
      },
      {
        span: 6,
        type: 'input',
        label: 'Proveedor',
        key: 'supplier',
        value: '',
      },
      {
        span: 6,
        type: 'button',
        label: 'Filtrar',
        key: 'filter',
        buttonType: 'primary',
        htmlType: 'submit',
      },
    ],
  },
]);

export default fieldsData;
