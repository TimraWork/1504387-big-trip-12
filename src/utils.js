import {EVENT_TYPE} from './const.js';

export const getRandomInteger = (min, max, num = 1) => {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
};

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTitle = (type, city) => {
  const labels = EVENT_TYPE.joinLabels;
  const movements = EVENT_TYPE.movements;
  const label = movements.includes(type) ? labels[0] : labels[1];

  return `${capitalizeFirstLetter(type)}  ${label} ${city}`;
};

export const formatTime = (dates) => {
  const times = dates.toLocaleString([], {hour: `2-digit`, minute: `2-digit`});

  return times.split(`,`).join(` — `);
};

export const getDuration = (start, end) => {
  const duration = start - end;

  return duration;
};
