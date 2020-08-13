import {EVENT_TYPE} from './const.js';

export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const getRandomInteger = (min, max, num = 1) => {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
};

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTitle = (type) => {
  const labels = EVENT_TYPE.joinLabels;
  const movements = EVENT_TYPE.movements;
  const label = movements.includes(type) ? labels[0] : labels[1];

  return `${capitalizeFirstLetter(type)}  ${label}`;
};

export const formatTime = (dates) => {
  const times = dates.toLocaleString([], {hour: `2-digit`, minute: `2-digit`});
  return times.split(`,`).join(` — `);
};

export const getDuration = (dateRange) => {
  const [d1, d2] = dateRange;
  const interval = new Date(d2 - d1);


  const diffDay = interval.getUTCDate() - 1 ? interval.getUTCDate() - 1 + `D` : ``;
  const diffHour = interval.getUTCHours() ? interval.getUTCHours() + `H` : ``;
  const diffMinutes = interval.getUTCMinutes() ? interval.getUTCMinutes() + `M` : ``;

  return `${diffDay} ${diffHour} ${diffMinutes}`;
};
