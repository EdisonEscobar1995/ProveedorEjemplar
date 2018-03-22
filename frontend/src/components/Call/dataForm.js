import { getMomentDate, format } from '../../utils/date';

const generalInfo = (fields) => {
  const {
    active,
    dateToFinishCall,
    deadlineToMakeSurvey,
    deadlineToMakeSurveyEvaluator,
    deadlineToMakeSurveyManagementCommittee,
    deadlineToMakeSurveyTecniqueCommittee,
    year,
  } = fields;

  return [
    {
      key: 1.1,
      value: [
        {
          span: 12,
          type: 'select',
          label: 'Año',
          key: 'year',
          value: year ? year.toString() : '',
          disabled: true,
          options: [],
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha cierre de convocatoria',
          key: 'dateToFinishCall',
          format,
          value: dateToFinishCall ? getMomentDate(dateToFinishCall) : dateToFinishCall,
          disabled: true,
          rules: [{
            validator: (rule, value, cb) => {
              cb();
            },
          }],
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para hacer la encuesta',
          key: 'deadlineToMakeSurvey',
          format,
          value: deadlineToMakeSurvey ? getMomentDate(deadlineToMakeSurvey) : deadlineToMakeSurvey,
          disabled: true,
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para encuestas equipo evaluador',
          key: 'deadlineToMakeSurveyEvaluator',
          format,
          value: deadlineToMakeSurveyEvaluator
            ? getMomentDate(deadlineToMakeSurveyEvaluator)
            : deadlineToMakeSurveyEvaluator,
          disabled: true,
        },
      ],
    },
    {
      key: 1.3,
      value: [
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para encuesta comité técnico',
          key: 'deadlineToMakeSurveyTecniqueCommittee',
          format,
          value: deadlineToMakeSurveyTecniqueCommittee
            ? getMomentDate(deadlineToMakeSurveyTecniqueCommittee)
            : deadlineToMakeSurveyTecniqueCommittee,
          disabled: true,
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para encuesta comité gerencial',
          key: 'deadlineToMakeSurveyManagementCommittee',
          format,
          value: deadlineToMakeSurveyManagementCommittee
            ? getMomentDate(deadlineToMakeSurveyManagementCommittee)
            : deadlineToMakeSurveyManagementCommittee,
          disabled: true,
        },
      ],
    },
    {
      key: 1.4,
      value: [
        {
          type: 'radio',
          label: 'Estado',
          key: 'active',
          value: active,
          disabled: true,
          options: [
            {
              id: true,
              name: 'Abierto',
            },
            {
              id: false,
              name: 'Cerrado',
            },
          ],
        },
      ],
    },
  ];
};

export default generalInfo;
