import { getMomentDate, format } from '../../utils/date';

const generalInfo =
(fields, changeDateToFinishCall, disabled, validateCallDate, disabledByDate) => {
  const {
    id,
    dateToFinishCall,
    deadlineToMakeSurvey,
    deadlineToMakeSurveyEvaluator,
    deadlineToMakeSurveyManagerTeam,
    deadlineToMakeSurveyTechnicalTeam,
    year,
  } = fields;

  return [
    {
      key: 1,
      value: [
        {
          span: 12,
          type: 'input',
          label: 'Id',
          key: 'id',
          value: id,
          style: { display: 'none' },
        },
      ],
    },
    {
      key: 1.1,
      value: [
        {
          span: 12,
          type: 'input',
          label: 'Año',
          key: 'year',
          value: year ? year.toString() : '',
          disabled: disabledByDate,
          required: true,
          rules: [
            { pattern: /^\d{4}$/g, message: 'Ingrese un año' },
            { max: 4, message: 'Máximo 4 caracteres' },
          ],
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha cierre de convocatoria',
          key: 'dateToFinishCall',
          required: true,
          disabled: disabledByDate,
          format,
          value: dateToFinishCall ? getMomentDate(dateToFinishCall) : dateToFinishCall,
          handleChange: changeDateToFinishCall,
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
          required: true,
          format,
          disabled: disabled || disabledByDate,
          value: deadlineToMakeSurvey ? getMomentDate(deadlineToMakeSurvey) : deadlineToMakeSurvey,
          rules: [{
            validator: validateCallDate,
            message: 'La encuesta debe tener una fecha inferior al cierre de convocatoria',
          }],
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para encuestas equipo evaluador',
          key: 'deadlineToMakeSurveyEvaluator',
          required: true,
          format,
          disabled: disabled || disabledByDate,
          value: deadlineToMakeSurveyEvaluator
            ? getMomentDate(deadlineToMakeSurveyEvaluator)
            : deadlineToMakeSurveyEvaluator,
          rules: [{
            validator: validateCallDate,
            message: 'La encuesta debe tener una fecha inferior al cierre de convocatoria',
          }],
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
          key: 'deadlineToMakeSurveyTechnicalTeam',
          required: true,
          format,
          disabled: disabled || disabledByDate,
          value: deadlineToMakeSurveyTechnicalTeam
            ? getMomentDate(deadlineToMakeSurveyTechnicalTeam)
            : deadlineToMakeSurveyTechnicalTeam,
          rules: [{
            validator: validateCallDate,
            message: 'La encuesta debe tener una fecha inferior al cierre de convocatoria',
          }],
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para encuesta comité gerencial',
          key: 'deadlineToMakeSurveyManagerTeam',
          required: true,
          format,
          disabled: disabled || disabledByDate,
          value: deadlineToMakeSurveyManagerTeam
            ? getMomentDate(deadlineToMakeSurveyManagerTeam)
            : deadlineToMakeSurveyManagerTeam,
          rules: [{
            validator: validateCallDate,
            message: 'La encuesta debe tener una fecha inferior al cierre de convocatoria',
          }],
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
          label: 'Guardar',
          key: 'save',
          buttonType: 'primary',
          htmlType: 'submit',
        },
      ],
    },
  ];
};

export default generalInfo;
