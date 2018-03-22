import { LOCKED, NOTIFIED } from '../../utils/const';

const formData = ({ data, getModifiedSuppliers, filterModifiedSuppliers, form }) => {
  const states = [
    {
      id: LOCKED,
      name: LOCKED,
    },
    {
      id: NOTIFIED,
      name: NOTIFIED,
    },
  ];
  const {
    years,
    suppliers,
    masters,
  } = data;

  const handleReset = () => {
    form.resetFields();
    getModifiedSuppliers();
  };

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'year',
          value: years && years.length > 0 ? years[0] : '',
          options: years ? years.map(item => ({ id: item, name: item })) : [],
          handleChange: getModifiedSuppliers,
          allowClear: false,
          valuesToClean: {
            supply: { value: '' },
            category: { value: '' },
            country: { value: '' },
            supplier: { value: '' },
            state: { value: '' },
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Suministros',
          key: 'supply',
          value: '',
          options: masters ? masters.Supply : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supply: value };
            filterModifiedSuppliers(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Categoría',
          key: 'category',
          value: '',
          options: masters ? masters.Category : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), category: value };
            filterModifiedSuppliers(values);
          },
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'País',
          key: 'country',
          value: '',
          options: masters ? masters.Country : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), country: value };
            filterModifiedSuppliers(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          options: suppliers ? suppliers.map((item) => {
            item.name = item.businessName;
            return item;
          }) : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterModifiedSuppliers(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Estado',
          key: 'state',
          value: '',
          options: states,
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), state: value };
            filterModifiedSuppliers(values);
          },
        },
      ],
    },
    {
      key: 1.3,
      justify: 'center',
      value: [
        {
          span: 2,
          type: 'button',
          label: 'Limpiar',
          key: 'clear',
          buttonType: 'primary',
          handleclick: handleReset,
        },
      ],
    },
  ];
};

export default formData;
