const columnsData = masters => [
  {
    title: 'Convocatoria',
    key: 'idCall',
    render(text, record) {
      return masters.Call && masters.Call.find(item => item.id === record.idCall).name;
    },
  },
  {
    title: 'Gerente',
    key: 'idUser',
    render(text, record) {
      const user = masters.User && masters.User.find(item => item.id === record.idUser);
      return user && user.name;
    },
  },
];

export default columnsData;
