const columnsData = masters => [
  {
    title: 'Suministro',
    key: 'idSupply',
    render(text, record) {
      return masters.Supply && masters.Supply.find(item => item.id === record.idSupply).name;
    },
  },
  {
    title: 'Categoría',
    key: 'idCategory',
    render(text, record) {
      return masters.Category && masters.Category.find(item => item.id === record.idCategory).name;
    },
  },
  {
    title: 'País',
    key: 'idCountry',
    render(text, record) {
      return masters.Country && masters.Country.find(item => item.id === record.idCountry).name;
    },
  },
  {
    title: 'Negociador',
    key: 'idUser',
    render(text, record) {
      const user = masters.User && masters.User.find(item => item.id === record.idUser);
      return user && user.name;
    },
  },
];

export default columnsData;
