import {EVENT_TYPE, MAX_INFO_CITIES} from './const.js';

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
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

export const formatType = (type) => {
  const labels = EVENT_TYPE.joinLabels;
  const movements = EVENT_TYPE.movements;
  const label = movements.includes(type) ? labels[0] : labels[1];

  return `${capitalizeFirstLetter(type)}  ${label}`;
};

export const formatDate = (date) => {
  return date.toLocaleDateString(`en-En`, {day: `2-digit`, month: `2-digit`, year: `2-digit`}); // 8/13/20
};

export const formatTime = (date) => {
  return date.toLocaleString([], {hour: `2-digit`, minute: `2-digit`}); // 00:00
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`; // 8/13/20 00:00
};

export const formatMonthDate = (date) => {
  return date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`}); // Aug 13
};

const getDiff = (countTime, label) => {
  return countTime ? countTime + label : ``;
};

export const getTotalPrice = (items) => {
  let totalOffers = 0;
  for (const item of items) {
    const sumPrices = item.offers.reduce((a, b) => ({price: a.price + b.price}));
    totalOffers += sumPrices;
  }
  const totalPrice = items.reduce((a, b) => ({price: a.price + b.price}));
  return totalPrice.price + totalOffers.price;
};

export const getEventCities = (items) => {
  let cities = items.map((item) => item.city);
  if (cities.length > MAX_INFO_CITIES) {
    cities = `${cities[0]}  &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  } else {
    cities = cities.join(` &mdash; `);
  }
  return cities;
};

export const getEventDates = (items) => {
  let dates = items.map((item) => item.dateRange);
  const startDate = dates[0][0];
  const endDate = dates[dates.length - 1][1];
  if (startDate.getMonth() === endDate.getMonth()) {
    dates = `${formatMonthDate(startDate)} &mdash; ${endDate.getDate()}`;
  } else {
    dates = `${formatMonthDate(startDate)} &mdash; ${formatMonthDate(endDate)}`;

  }
  return dates;
};

export const getDuration = (dateRange) => {
  const [d1, d2] = dateRange;
  const interval = new Date(d2 - d1);

  const diffDay = getDiff(interval.getUTCDate() - 1, `D`);
  const diffHour = getDiff(interval.getUTCHours(), `H`);
  const diffMinutes = getDiff(interval.getUTCMinutes(), `M`);

  return `${diffDay} ${diffHour} ${diffMinutes}`;
};
