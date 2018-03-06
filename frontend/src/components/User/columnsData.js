import React from 'react';

const columnsData = masters => [
  {
    title: 'Nombre',
    key: 'name',
    sorter: (a, b) => (a.name < b.name ? -1 : 1),
  },
  {
    title: 'Correo',
    key: 'email',
  },
  {
    title: 'Roles',
    key: 'idRols',
    render(text, record) {
      return masters.Roles &&
        record.idRols.map(id => (<div>{masters.Roles.find(item => item.id === id).name}</div>));
    },
  },
];

export default columnsData;
