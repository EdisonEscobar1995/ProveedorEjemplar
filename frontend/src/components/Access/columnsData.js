const columnsData = [
  {
    title: 'Api',
    key: 'api',
    sorter: (a, b) => (a.api < b.api ? -1 : 1),
  },
  {
    title: 'Acción',
    key: 'action',
    sorter: (a, b) => (a.action < b.action ? -1 : 1),
  },
];

export default columnsData;
