import {getRandomInteger, shuffleArray} from '../utils.js';
import {EVENT_TYPE} from '../const.js';

const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `San Francisco`, `Miami`, `Mountain View`, `London`];
const DESTINATION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MAX_DESTINATIONS = 5;
const PHOTO_URLS = [`img/photos/1.jpg`, `img/photos/2.jpg`, `img/photos/3.jpg`, `img/photos/4.jpg`, `img/photos/5.jpg`];
const PRICE_RANGE = [10, 400];
const DAYS_RANGE = [-1, 1];
const GAP = 10;
const MaxTime = {
  HOURS: 23,
  MINUTES: 59,
  SECONDS: 59,
  MS_SECONDS: 999,
};
const OFFERS = [
  {name: `seats`, label: `Choose seats`, price: 5, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`]},
  {name: `meal`, label: `Add meal`, price: 15, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`, `ship`]},
  {name: `uber`, label: `Order Uber`, price: 20, isChecked: Boolean(getRandomInteger(0, 1)), types: [`taxi`]},
  {name: `luggage`, label: `Add luggage`, price: 30, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`, `ship`, `bus`, `transport`, `taxi`]},
  {name: `lunch`, label: `Lunch in city`, price: 30, isChecked: Boolean(getRandomInteger(0, 1)), types: [`sightseeing`, `check-in`]},
  {name: `train`, label: `Travel by train`, price: 40, isChecked: Boolean(getRandomInteger(0, 1)), types: [`check-in`]},
  {name: `tickets`, label: `Book tickets`, price: 40, isChecked: Boolean(getRandomInteger(0, 1)), types: [`sightseeing`, `bus`]},
  {name: `breakfast`, label: `Add breakfast`, price: 50, isChecked: Boolean(getRandomInteger(0, 1)), types: [`sightseeing`, `check-in`]},
  {name: `comfort`, label: `Switch to comfort`, price: 100, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`, `ship`, `taxi`]},
  {name: `rent`, label: `Rent a car`, price: 200, isChecked: Boolean(getRandomInteger(0, 1)), types: [`drive`]},
];

const generateOffers = (type) => {
  return OFFERS.filter((offer)=>offer.types.includes(type));
};

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
  const destinations = DESTINATION.split(`.`).slice(0, -1);
  let destination = shuffleArray(destinations).slice(0, MAX_DESTINATIONS).join(`.`);
  destination = destination.length ? destination + `.` : ``;
  return destination;
};

const generatePhotos = () => {
  return shuffleArray(PHOTO_URLS).slice(0, getRandomInteger(0, PHOTO_URLS.length));
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
  const name = generateType();
  return {
    type: {
      name,
      offers: generateOffers(name),
    },
    dateRange: generateDateRange(),
    city: {
      name: generateCity(),
      destination: generateDescription(),
      photos: generatePhotos(),
    },
    price: generatePrice()
  };
};
