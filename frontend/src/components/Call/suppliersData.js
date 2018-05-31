const suppliersData =
({
  record = {},
  closeModal,
  masters,
  mastersToList,
  getSuppliersByKey,
  fetching,
  // data,
  autoComplete,
  autoCompleteData,
}) => {
  const cancelSubmit = (e) => {
    const tecla = (document.all) ? e.keyCode : e.which;
    if (tecla === 13) {
      e.preventDefault();
    }
  };
  return [
    {
      key: 1.0,
      value: [
        {
          span: 24,
          type: 'title',
          value: 'Proveedor',
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
          value: record.id ? record.id : '',
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
          label: 'Código SAP',
          key: 'sapCode',
          value: record.sapCode ? record.sapCode : '',
          required: true,
          options: masters,
          onSearch: getSuppliersByKey,
          handleSelect: autoComplete,
          keyPress: cancelSubmit,
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
          label: 'NIT',
          key: 'nit',
          required: false,
          value: autoCompleteData.nit || record.nit,
        },
      ],
    },
    {
      key: 1.5,
      value: [
        {
          span: 24,
          type: 'input',
          label: 'Proveedor',
          key: 'businessName',
          required: false,
          value: autoCompleteData.businessName || record.businessName,
        },
      ],
    },
    {
      key: 1.6,
      value: [
        {
          span: 24,
          type: 'textarea',
          label: 'Correo electrónico',
          key: 'emails',
          required: true,
          value: record.emails && record.emails.join(', '),
          rules: [
            { pattern: /^((([A-Z0-9._%-])+@([A-Z0-9.-])+\.([A-Z]){2,4})(,\s?\b)?)+$/gi, message: 'El correo no tiene la estructura correcta' },
          ],
        },
      ],
    },
    {
      key: 1.7,
      value: [
        {
          span: 24,
          type: 'select',
          options: mastersToList ? mastersToList.Supply : [],
          label: 'Tipo de suministro',
          key: 'nameSupplyToLoad',
          required: true,
          value: record.idSupply,
        },
      ],
    },
    {
      key: 1.8,
      value: [
        {
          span: 24,
          type: 'select',
          options: mastersToList ? mastersToList.CompanySize : [],
          label: 'Tamaño de empresa',
          key: 'nameCompanySizeToLoad',
          required: false,
          value: record.idCompanySize,
        },
      ],
    },
    {
      key: 1.9,
      value: [
        {
          span: 24,
          type: 'select',
          options: mastersToList ? mastersToList.Country : [],
          label: 'País',
          key: 'nameCountryToLoad',
          required: true,
          value: record.idCountry,
        },
      ],
    },
    {
      key: 2,
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

export default suppliersData;
