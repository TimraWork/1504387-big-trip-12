import {EVENT_TYPE, MAX_INFO_CITIES, TEXT_DIVIDER} from './const.js';

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatEventType = (type) => {
  const labels = EVENT_TYPE.joinLabels;
  const movements = EVENT_TYPE.movements;
  const label = movements.includes(type) ? labels[0] : labels[1];

  return `${capitalizeFirstLetter(type)}  ${label}`;
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

export const getTripDays = (events) => {
  const dates = events.map((day) => formatDate(day.dateRange[0]));
  const days = [...new Set(dates)];

  return days;
};

export const filterEventsByDays = (events, day) => {
  return events.filter((event)=>formatDate(event.dateRange[0]) === day);
};

export const getEventsTotalPrice = (events) => {
  let totalSum = 0;

  for (const event of events) {
    const sumOffers = event.type.offers.map((it)=>it.price).reduce((a, b) => (a + b), 0);
    totalSum += (sumOffers + event.price);
  }

  return totalSum;
};

export const getEventsCitiesTitles = (events) => {
  let cities = events.map((item) => item.city.name);

  const titlesWithDividers = `${cities.join(TEXT_DIVIDER)}`;
  const titlesWithEllipsis = `${cities[0]} ${TEXT_DIVIDER} ... ${TEXT_DIVIDER} ${cities[cities.length - 1]}`;

  const citiesTitles = cities.length > MAX_INFO_CITIES ? titlesWithEllipsis : titlesWithDividers;

  return citiesTitles;
};

export const getEventsDates = (events) => {
  let dates = events.map((item) => item.dateRange);
  const startDate = dates[0][0];
  const endDate = dates[dates.length - 1][1];

  if (startDate.getMonth() === endDate.getMonth()) {
    dates = `${formatMonthDate(startDate)} ${TEXT_DIVIDER} ${endDate.getDate()}`;
  } else {
    dates = `${formatMonthDate(startDate)} ${TEXT_DIVIDER} ${formatMonthDate(endDate)}`;
  }

  return dates;
};

const getDiff = (countTime, label) => {
  return countTime ? countTime + label : ``;
};

export const getDuration = (dateRange) => {
  const [d1, d2] = dateRange;
  const interval = new Date(d2 - d1);

  const diffDay = getDiff(interval.getUTCDate() - 1, `D`);
  const diffHour = getDiff(interval.getUTCHours(), `H`);
  const diffMinutes = getDiff(interval.getUTCMinutes(), `M`);

  return `${diffDay} ${diffHour} ${diffMinutes}`;
};
