const columnsData = masters => [
  {
    title: 'Aplica a',
    key: 'applyTo',
    sorter: (a, b) => (a.applyTo < b.applyTo ? -1 : 1),
    render(text, record) {
      return masters.ApplyTo.find(item => item.id === record.applyTo).name;
    },
  },
  {
    title: 'Escala',
    key: 'name',
    sorter: (a, b) => (a.name < b.name ? -1 : 1),
  },
  {
    title: 'Peso',
    key: 'score',
  },
  {
    title: 'Ayuda',
    key: 'helpText',
  },
];

export default columnsData;
