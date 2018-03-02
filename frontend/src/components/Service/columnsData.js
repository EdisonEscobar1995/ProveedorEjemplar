const columnsData = [
  {
    title: 'Nombre',
    key: 'name',
    sorter: (a, b) => (a.name < b.name ? -1 : 1),
  },
  {
    title: 'Ayuda',
    key: 'helpText',
  },
];

export default columnsData;
