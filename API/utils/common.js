const Utils = {
  getNextId(data) {
    const lastId = data[data.length - 1].id;
    return lastId + 1;
  },
};

export default Utils;
