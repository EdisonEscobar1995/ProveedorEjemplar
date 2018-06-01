const columnsCriterion = [
  {
    title: 'Nombre del criterio',
    key: 'name',
    sorter: (a, b) => (a.name > b.name ? -1 : 1),
  },
];

export default columnsCriterion;
