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

export const formatDate = (date) => {
  return date.toLocaleDateString(`en-En`, {day: `2-digit`, month: `2-digit`, year: `2-digit`});
};

export const formatTime = (date) => {
  return date.toLocaleString([], {hour: `2-digit`, minute: `2-digit`});
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatMonthDate = (date) => {
  return date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`});
};
