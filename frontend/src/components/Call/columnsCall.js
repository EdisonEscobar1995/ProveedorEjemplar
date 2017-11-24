const columnsCall = [{
  title: 'Consecutivo',
  dataIndex: 'index',
  key: 'index',
  render: (text, record, index) => index + 1,
}, {
  title: 'Año',
  dataIndex: 'year',
  key: 'year',
}, {
  title: 'Fecha cierre de la convocatoria',
  dataIndex: 'dateToFinishCall',
  key: 'dateToFinishCall',
}, {
  title: 'Fecha límite para hacer la encuesta',
  dataIndex: 'deadlineToMakeSurvey',
  key: 'deadlineToMakeSurvey',
}, {
  title: 'Estado',
  dataIndex: 'active',
  key: 'active',
  render(text, record) {
    return record.active === true ? 'Active' : 'Inactivo';
  },
}];

export default columnsCall;
