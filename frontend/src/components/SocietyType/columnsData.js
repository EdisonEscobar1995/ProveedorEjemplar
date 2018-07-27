const columnsData = () => [
  {
    title: 'Nombre del tipo de sociedad',
    key: 'name',
    sorter: (a, b) => (a.name > b.name ? -1 : 1),
  },
];

export default columnsData;
