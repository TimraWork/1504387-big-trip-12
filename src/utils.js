import {EVENT_TYPE, MAX_INFO_CITIES, TEXT_DIVIDER, RenderPosition} from './const.js';

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    case RenderPosition.AFTER_END:
      container.after(element);
      break;
    default:
      container.appendChild(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
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
  return string[0].toUpperCase() + string.slice(1);
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

  return [...new Set(dates)];
};

export const filterEventsByDays = (events, day) => {
  return events.filter((event)=>formatDate(event.dateRange[0]) === day);
};

export const getEventsCitiesTitles = (events) => {
  const cities = events.map((event) => event.city.name);

  const titlesWithDividers = `${cities.join(TEXT_DIVIDER)}`;
  const titlesWithEllipsis = `${cities[0]} ${TEXT_DIVIDER} ... ${TEXT_DIVIDER} ${cities[cities.length - 1]}`;

  return cities.length > MAX_INFO_CITIES ? titlesWithEllipsis : titlesWithDividers;
};

export const getEventsDates = (events) => {
  let dates = events.map((event) => event.dateRange);
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

export const getEventsTotalPrice = (events) => {
  const totalSum = events.reduce((accumulator, current)=>{
    const sumOffers = current.type.offers
      .filter((offer)=>offer.isChecked)
      .map((offer)=>offer.price)
      .reduce((acc, curr) => (acc + curr), 0);

    return accumulator + (current.price + sumOffers);
  }, 0);

  return totalSum;
};
