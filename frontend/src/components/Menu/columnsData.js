const columnsData = masters => [
  {
    title: 'Categoría',
    key: 'categoryNumber',
    render(text, record) {
      return masters.Category
        && masters.Category.find(item => item.id === record.categoryNumber).name;
    },
  },
  {
    title: 'Título',
    key: 'title',
  },
];

export default columnsData;
