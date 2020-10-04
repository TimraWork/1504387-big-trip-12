import {EventType, MAX_INFO_CITIES, TEXT_DIVIDER} from '../const.js';
import {formatMonthDate, formatDate} from './common.js';
import moment from "moment";

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const formatEventType = (type) => {
  const labels = EventType.JOIN_LABELS;
  const transfers = EventType.TRANSFERS.map((transfer) => transfer.NAME);
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
  const cities = events.map((event) => event.destination.name);

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

const getTimeInterval = (event) => {
  const [d1, d2] = event.dateRange;
  return new Date(d1 - d2);
};

export const sortTime = (eventA, eventB) => {
  return getTimeInterval(eventA) - getTimeInterval(eventB);
};

export const sortPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const getOffers = (dataOffers, type) => {
  if (dataOffers) {
    const filteredDataOffers = dataOffers.filter((offer) => offer.type === type);
    const [offersObj] = filteredDataOffers;

    return offersObj.offers;
  }
  return [];
};

export const getEventsTotalPrice = (events) => {
  const totalSum = events.reduce((accumulator, current) => {

    const sumOffers = current.offers
      .map((offer)=>offer.price)
      .reduce((acc, curr) => (acc + curr), 0);

    return accumulator + (+current.price + sumOffers);
  }, 0);

  return totalSum;
};

export const validateDestination = (destinationInput, eventEditForm, destinations, callback) => {
  const isDataCorrect = destinations.map((destination) => destination.name).includes(destinationInput.value);

  if (destinationInput.validity.valueMissing) {
    destinationInput.setCustomValidity(`Please, select value from the list below`);
  } else if (!isDataCorrect) {
    destinationInput.setCustomValidity(`Please, remove everything and select value from the list below`);
  } else {
    destinationInput.setCustomValidity(``);

    callback();
  }
  eventEditForm.reportValidity();
};

export const validatePrice = (priceInput, eventEditForm, callback) => {
  priceInput.setCustomValidity(``);

  const isStartedWithoutZero = /^(?:[1-9][0-9]*|0)$/.test(priceInput.value);

  if (priceInput.validity.valueMissing || !priceInput.checkValidity() || !isStartedWithoutZero) {
    priceInput.setCustomValidity(`Please, write the positive integer number`);
  } else {
    priceInput.setCustomValidity(``);

    callback();
  }
  eventEditForm.reportValidity();
};

export const isDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `day`);
};

export const validateDate = (dateRange, form, input) => {
  input.setCustomValidity(``);
  if (moment(dateRange[0]).isAfter(dateRange[1])) {
    input.setCustomValidity(`Please, select the correct date`);

  } else {
    input.setCustomValidity(``);
  }
  form.reportValidity();
};
