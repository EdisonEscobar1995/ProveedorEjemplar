function reloadKeys(data) {
  const keyData = data.map((item, index) => {
    item.key = index;
    return item;
  });
  return keyData;
}

export default reloadKeys;
