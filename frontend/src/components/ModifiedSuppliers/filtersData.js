import { LOCKED, NOTIFIED } from '../../utils/const';

const filtersData = ({ data, getModifiedSuppliers, filterModifiedSuppliers, form }) => {
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

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'ModifiedSuppliers.year',
          key: 'year',
          value: years && years.length > 0 ? years[0] : '',
          options: years ? years.map(item => ({ id: item, name: item })) : [],
          handleChange: getModifiedSuppliers,
          allowClear: false,
          valuesToClean: {
            supply: {
              value: '',
            },
            category: {
              value: '',
            },
            country: {
              value: '',
            },
            supplier: {
              value: '',
            },
            state: {
              value: '',
            },
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'ModifiedSuppliers.supply',
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
          label: 'ModifiedSuppliers.category',
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
          label: 'ModifiedSuppliers.country',
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
          label: 'ModifiedSuppliers.supplier',
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
          label: 'ModifiedSuppliers.state',
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
  ];
};

export default filtersData;
