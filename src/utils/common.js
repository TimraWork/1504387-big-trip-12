import moment from "moment";

export const getRandomInteger = (min, max, num = 1) => {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const formatDate = (date) => {
  return moment(date).format(`L`);
};

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

export const formatMonthDate = (date) => {
  return moment(date).format(`MMM DD`);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
