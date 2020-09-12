import {getRandomInteger, generateId} from '../utils/common.js';
import {getOffersByType} from '../utils/event.js';
import {EVENT_TYPE} from '../const.js';
import {DESTINATIONS} from '../mock/destinations.js';

const PRICE_RANGE = [10, 400];
const DAYS_RANGE = [-1, 1];
const GAP = 10;
const MaxTime = {
  HOURS: 23,
  MINUTES: 59,
  SECONDS: 59,
  MS_SECONDS: 999,
};

const generateType = () => {
  const types = [...EVENT_TYPE.transfers, ...EVENT_TYPE.activities];
  return types[getRandomInteger(0, types.length - 1)];
};

const generateDestination = () => {
  return DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)];
};

const generatePrice = () => {
  return getRandomInteger(...PRICE_RANGE, GAP);
};

const generateTime = () => {
  return Object.entries(MaxTime).reduce((accumulator, current)=>{
    accumulator[current[0]] = getRandomInteger(0, current[1], GAP);
    return accumulator;
  }, {});
};

const generateDate = () => {
  const daysGap = getRandomInteger(...DAYS_RANGE);
  const currentDate = new Date();

  currentDate.setHours(...Object.values(generateTime()));
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateDateRange = () => {
  const dateRange = [generateDate(), generateDate()].sort((a, b)=> a.getTime() - b.getTime());
  return dateRange;
};

const generateOffers = (type) => {
  const offers = getOffersByType(type).map((offer) => offer.name);
  return offers.slice(0, offers.length - 1);
};

export const generateEvent = () => {
  const type = generateType();
  return {
    id: generateId(),
    type,
    offers: generateOffers(type),
    destination: generateDestination(),
    dateRange: generateDateRange(),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
