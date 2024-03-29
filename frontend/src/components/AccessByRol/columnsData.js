const columnsData = masters => [
  {
    title: 'Api',
    key: 'idAccessApi',
    render(text, record) {
      return masters.Access && masters.Access.find(item => item.id === record.idAccess).api;
    },
  },
  {
    title: 'Acción',
    key: 'idAccessAction',
    render(text, record) {
      return masters.Access && masters.Access.find(item => item.id === record.idAccess).action;
    },
  },
  {
    title: 'Rol',
    key: 'idRol',
    render(text, record) {
      return masters.Roles && masters.Roles.find(item => item.id === record.idRol).name;
    },
  },
];

export default columnsData;
