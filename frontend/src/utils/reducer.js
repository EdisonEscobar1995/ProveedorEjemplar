function reloadKeys(data) {
  const keyData = data.map((item, index) => {
    item.key = index;
    return item;
  });
  return keyData;
}

const insertData = (array, id, data) => {
  if (!array || array.length === 0) {
    return [data];
  }
  let index = 0;
  const newArray = array.map((element, position) => {
    if (element.id === id) {
      index = position;
    }
    return element;
  });
  newArray.splice(index + 1, 0, data);
  return newArray;
};

const updateData = (array, data) => (
  array.map((element) => {
    if (element.id === data.id) {
      return {
        ...element,
        ...data,
      };
    }
    return element;
  })
);

const deleteData = (array, id) => {
  let index = 0;
  const newArray = array.map((element, position) => {
    if (element.id === id) {
      index = position;
    }
    return element;
  });
  newArray.splice(index, 1);
  return newArray;
};

export {
  reloadKeys,
  insertData,
  updateData,
  deleteData,
};

