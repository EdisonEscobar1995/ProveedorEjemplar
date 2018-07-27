const columnsData = () => [
  {
    title: 'Nombre del tamaño de compañia',
    key: 'name',
    sorter: (a, b) => (a.name > b.name ? -1 : 1),
  },
];

export default columnsData;
