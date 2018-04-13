const formData = ({ data, getManagerTeamSurvey, filterManagerTeamSurvey, form }) => {
  const {
    years,
    suppliers,
  } = data;

  const getUniqueSuppliers = () => {
    const suppliersAux = [];
    const idSuppliers = [];
    if (suppliers) {
      suppliers.forEach((item) => {
        const idSupplier = item.id;
        if (idSuppliers.indexOf(idSupplier) === -1) {
          item.name = item.businessName;
          idSuppliers.push(idSupplier);
          suppliersAux.push(item);
        }
      });
    }
    return suppliersAux;
  };

  const FormData = [
    {
      key: 1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'year',
          value: years && years.length > 0 ? years[0] : '',
          options: years ? years.map(item => ({ id: item, name: item })) : [],
          handleChange: getManagerTeamSurvey,
          allowClear: false,
          style: { display: 'none' },
          valuesToClean: {
            supply: { value: '' },
            category: { value: '' },
            country: { value: '' },
            supplier: { value: '' },
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          style: { width: '90%', display: 'block', margin: ' 0 auto' },
          options: getUniqueSuppliers(),
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterManagerTeamSurvey(values);
          },
        },
      ],
    },
  ];
  return FormData;
};

export default formData;
