import {EVENT_TYPE, MAX_INFO_CITIES, TEXT_DIVIDER} from '../const.js';
import {formatMonthDate, formatDate} from './common.js';

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const formatEventType = (type) => {
  const labels = EVENT_TYPE.joinLabels;
  const transfers = EVENT_TYPE.transfers;
  const label = transfers.includes(type) ? labels[0] : labels[1];

  return `${capitalizeFirstLetter(type)}  ${label}`;
};

export const getTripDays = (events) => {
  const dates = events.map((day) => formatDate(day.dateRange[0]));

  return [...new Set(dates)].sort();
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

const getDurationDiff = (countTime, label) => {
  return countTime ? countTime + label : ``;
};

export const getEventDuration = (dateRange) => {
  const [d1, d2] = dateRange;
  const interval = new Date(d2 - d1);

  const diffDay = getDurationDiff(interval.getUTCDate() - 1, `D`);
  const diffHour = getDurationDiff(interval.getUTCHours(), `H`);
  const diffMinutes = getDurationDiff(interval.getUTCMinutes(), `M`);

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

export const sortTime = (eventA, eventB) => {
  return eventA.dateRange[0].getTime() - eventB.dateRange[0].getTime();
};

export const sortPrice = (eventA, eventB) => {
  return eventA.price - eventB.price;
};
