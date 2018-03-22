import exportData from '../../utils/excel';

const formData = ({ data, getCriterionsByDimension, getResults, form }) => {
  const {
    Call,
    Supply,
    Category,
    CompanySize,
    Supplier,
    Dimension,
    Criterion,
    Country,
  } = data;

  const handleReset = () => {
    form.resetFields();
  };

  const exportExcel = (excelData) => {
    const header = [
      'Código SAP',
      'NIT',
      'Proveedor',
      'Tipo de suministro',
      'Categoría',
      'Tamaño de empresa',
      'Dimensión',
      'Criterio',
      'Pregunta',
      'Respuesta proveedor',
      'Comentarios',
      'Resultado proveedor',
      'Resultado esperado',
      'Total proveedor',
      'Total esperado',
      'Porcentaje obtenido',
      'Respuesta evaluador',
      'Comentarios',
      'Resultado evaluador',
      'Resultado esperado',
      'Total evaluador',
      'Total esperado',
      'Porcentaje obtenido',
    ];
    const report = [header];
    excelData.forEach((supplier) => {
      supplier.summarySurvey.forEach((item) => {
        let labelForExpected;
        if (item.questionType === 'Abierta') {
          labelForExpected = 'Pregunta abierta';
        } else {
          labelForExpected = 'No aplica';
        }
        report.push([
          supplier.sapCode,
          supplier.nit,
          supplier.name,
          supplier.supply,
          supplier.category,
          supplier.companySize,
          item.dimension,
          item.criterion,
          item.question,
          item.answerSupplier,
          item.commentSupplier,
          item.expectedScoreSupplier < 0 || item.scoreOfSupplier < 0 ? 'No aplica' : item.scoreOfSupplier,
          item.expectedScoreSupplier < 0 ? labelForExpected : item.expectedScoreSupplier,
          supplier.scoreOfSupplier < 0 ? 'No aplica' : supplier.scoreOfSupplier,
          supplier.expectedScoreSupplier < 0 ? 'No aplica' : supplier.expectedScoreSupplier,
          supplier.totalScoreOfSupplier < 0 ? 'No aplica' : supplier.totalScoreOfSupplier,
          item.answerEvaluator,
          item.commentEvaluator,
          item.expectedScoreEvaluator < 0 || item.scoreOfEvaluator < 0 ? 'No aplica' : item.scoreOfEvaluator,
          item.expectedScoreEvaluator < 0 ? labelForExpected : item.expectedScoreEvaluator,
          supplier.scoreOfEvaluator < 0 ? 'No aplica' : supplier.scoreOfEvaluator,
          supplier.expectedScoreEvaluator < 0 ? 'No aplica' : supplier.expectedScoreEvaluator,
          supplier.totalScoreOfEvaluator < 0 ? 'No aplica' : supplier.totalScoreOfEvaluator,
        ]);
      });
    });
    exportData([{
      data: report,
      title: 'Resultados',
    }], 'ResultadosProveedorEquipoEvaluador.xlsx');
  };

  const handleResults = () => {
    getResults(form.getFieldsValue(), exportExcel);
  };

  return [
    {
      key: 1.1,
      value: [
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
        {
          span: 8,
          type: 'select',
          label: 'Categoría',
          key: 'category',
          value: '',
          options: Category,
        },
      ],
    },
    {
      key: 1.2,
      value: [
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
        {
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
      ],
    },
    {
      key: 1.3,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Criterio',
          key: 'criterion',
          value: '',
          options: Criterion,
        },
        {
          span: 8,
          type: 'select',
          label: 'País',
          key: 'country',
          value: '',
          options: Country,
        },
      ],
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
          handleclick: handleResults,
        },
      ],
    },
  ];
};

export default formData;
