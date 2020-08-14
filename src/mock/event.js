import {getRandomInteger, shuffleArray} from '../utils.js';
import {EVENT_TYPE} from '../const.js';

const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `San Francisco`, `Miami`, `Mountain View`, `London`];
const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const PHOTO_URLS = [`img/photos/1.jpg`, `img/photos/2.jpg`, `img/photos/3.jpg`, `img/photos/4.jpg`, `img/photos/5.jpg`];
const PRICE_RANGE = [10, 1000];
const GAP = 10;
const OFFER = [
  {name: `luggage`, label: `Add luggage`, price: 30},
  {name: `comfort`, label: `Switch to comfort`, price: 100},
  {name: `meal`, label: `Add meal`, price: 15},
  {name: `seats`, label: `Choose seats`, price: 5},
  {name: `train`, label: `Travel by train`, price: 40},
];
const MaxTime = {
  HOURS: 23,
  MINUTES: 59,
  SECONDS: 59,
  MS_SECONDS: 999,
};
export const DAYS_RANGE = [-1, 1];

const generateType = () => {
  const types = [...EVENT_TYPE.movements, ...EVENT_TYPE.activities];
  return types[getRandomInteger(0, types.length - 1)];
};

const generateCity = () => {
  return CITIES[getRandomInteger(0, CITIES.length - 1)];
};

const generatePrice = () => {
  return getRandomInteger(...PRICE_RANGE, GAP);
};

const generateDescription = () => {
  const descriptions = DESCRIPTION.split(`.`).slice(0, -1);
  let description = shuffleArray(descriptions).slice(0, getRandomInteger(0, descriptions.length - 1)).join(`.`);
  description = description.length ? description + `.` : ``;
  return description;
};

const generatePhotos = () => {
  return shuffleArray(PHOTO_URLS).slice(0, getRandomInteger(0, PHOTO_URLS.length - 1));
};

const generateOffers = () => {
  return OFFER.slice(0, getRandomInteger(0, OFFER.length - 1));
};

const generateTime = () => {
  const time = {};
  for (let [key, value] of Object.entries(MaxTime)) {
    time[key] = getRandomInteger(0, value, GAP);
  }
  return time;
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

export const generateEvent = () => {
  return {
    dateRange: generateDateRange(),
    type: generateType(),
    city: generateCity(),
    price: generatePrice(),
    offers: generateOffers(),
    destination: {
      description: generateDescription(),
      photos: generatePhotos(),
    }
  };
};
