const generalInfo = (fields) => {
  const {
    /* id, */
    active,
    dateToFinishCall,
    deadlineToMakeSurvey,
    deadlineToMakeSurveyEvaluator,
    deadlineToMakeSurveyManagementCommittee,
    deadlineToMakeSurveyTecniqueCommittee,
    /* managementCommittee,
    supplier, */
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
          value: year,
          required: true,
          options: [],
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha cierre de convocatoria',
          key: 'dateToFinishCall',
          value: dateToFinishCall,
          required: true,
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
          value: deadlineToMakeSurvey,
          required: true,
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para encuestas equipo evaluador',
          key: 'deadlineToMakeSurveyEvaluator',
          value: deadlineToMakeSurveyEvaluator,
          required: true,
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
          value: deadlineToMakeSurveyTecniqueCommittee,
          required: true,
        },
        {
          span: 12,
          type: 'date',
          label: 'Fecha límite para encuesta comité gerencial',
          key: 'deadlineToMakeSurveyManagementCommittee',
          value: deadlineToMakeSurveyManagementCommittee,
          required: true,
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
          required: true,
          options: [
            {
              id: 'abierto',
              name: 'Abierto',
            },
            {
              id: 'cerrado',
              name: 'Cerrado',
            },
          ],
        },
      ],
    },
  ];
};

export default generalInfo;
