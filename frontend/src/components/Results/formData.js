import { SUPPLIER_EVALUATOR, TECHNICAL_MANAGER } from '../../utils/const';

const formData = ({
  data, type, changeType, getCriterionsByDimension, getItemsByService, form,
}) => {
  const {
    Call,
    Supply,
    Category,
    CompanySize,
    Supplier,
    Dimension,
    Criterion,
    Service,
    Item,
    Country,
  } = data;

  const handleReset = () => {
    form.resetFields();
  };

  let denpendentFields = [{
    span: 8,
    type: 'select',
    label: 'País',
    key: 'country',
    value: '',
    options: Country,
  }];

  if (type === SUPPLIER_EVALUATOR) {
    denpendentFields = denpendentFields.concat({
      span: 8,
      type: 'select',
      label: 'Dimensión',
      key: 'dimension',
      value: '',
      options: Dimension,
      handleChange: (value) => {
        getCriterionsByDimension(value);
      },
      valuesToClean: {
        criterion: {
          value: '',
        },
      },
    },
    {
      span: 8,
      type: 'select',
      label: 'Criterio',
      key: 'criterion',
      value: '',
      options: Criterion,
    });
  }

  if (type === TECHNICAL_MANAGER) {
    denpendentFields = denpendentFields.concat({
      span: 8,
      type: 'select',
      label: 'Servicio',
      key: 'service',
      value: '',
      options: Service,
      handleChange: (value) => {
        getItemsByService(value);
      },
      valuesToClean: {
        item: {
          value: '',
        },
      },
    },
    {
      span: 8,
      type: 'select',
      label: 'Item',
      key: 'item',
      value: '',
      options: Item,
    });
  }

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Tipo',
          key: 'type',
          value: type,
          required: true,
          options: [{
            id: SUPPLIER_EVALUATOR,
            name: 'Resultados por Proveedor y Equipo evaluador',
          }, {
            id: TECHNICAL_MANAGER,
            name: 'Resultados por Comité técnico y Comité Gerencial',
          }],
          handleChange: changeType,
          allowClear: false,
        },
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'call',
          value: Call ? Call[0].id : '',
          options: Call ? Call.map(item => ({
            id: item.id,
            name: item.year,
          })) : [],
          allowClear: false,
        },
        {
          span: 8,
          type: 'select',
          label: 'Tipo de suministro',
          key: 'supply',
          value: '',
          options: Supply,
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Categoría',
          key: 'category',
          value: '',
          options: Category,
        },
        {
          span: 8,
          type: 'select',
          label: 'Tamaño',
          key: 'companySize',
          value: '',
          options: CompanySize,
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          options: Supplier ? Supplier.map(item => ({
            id: item.id,
            name: item.businessName,
          })) : [],
        },
      ],
    },
    {
      key: 1.3,
      value: denpendentFields,
    },
    {
      key: 1.4,
      justify: 'center',
      value: [
        {
          span: 2,
          type: 'button',
          label: 'Limpiar',
          key: 'clear',
          buttonType: 'primary',
          handleclick: handleReset,
        }, {
          span: 2,
          type: 'button',
          label: 'Exportar a Excel',
          key: 'export',
          buttonType: 'primary',
          htmlType: 'submit',
        },
      ],
    },
  ];
};

export default formData;
