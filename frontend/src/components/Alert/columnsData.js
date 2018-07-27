const columnsData = () => [
  {
    title: 'Estado',
    key: 'name',
    sorter: (a, b) => (a.name > b.name ? -1 : 1),
  },
];

export default columnsData;
