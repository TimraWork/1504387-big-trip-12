import {EVENT_TYPE, MAX_INFO_CITIES, TEXT_DIVIDER, OFFERS_DATA} from '../const.js';
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
  const cities = events.map((event) => event.destination);

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

export const sortTime = (eventA, eventB) => {
  return eventA.dateRange[0].getTime() - eventB.dateRange[0].getTime();
};

export const sortPrice = (eventA, eventB) => {
  return eventA.price - eventB.price;
};

export const getOffersByType = (type) => {
  return OFFERS_DATA.filter((offer) => offer.types.includes(type));
};

export const getOffers = (dataOffers, type) => {
  return dataOffers.filter((offer) => offer.types.includes(type));
};

export const getOffersByData = (offers, dataOffers) => {
  const filteredDataOffers = [];

  offers.forEach((offer) =>{
    filteredDataOffers.push(dataOffers.find((element) => element.name === offer));
  });

  return filteredDataOffers;
};

export const getDestinationByData = (destination, dataDestinations) => {
  return dataDestinations.find((element) => element.name === destination);
};

export const getEventsTotalPrice = (events, dataOffers) => {
  const totalSum = events.reduce((accumulator, current)=>{

    const sumOffers = getOffersByData(current.offers, dataOffers)
      .map((offer)=>offer.price)
      .reduce((acc, curr) => (acc + curr), 0);

    return accumulator + (current.price + sumOffers);
  }, 0);

  return totalSum;
};
