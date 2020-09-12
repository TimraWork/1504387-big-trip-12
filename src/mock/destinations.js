import {getRandomInteger, shuffleArray} from '../utils/common.js';

export const DESTINATIONS = [`Amsterdam`, `Chamonix`, `Geneva`, `San Francisco`, `Miami`, `Mountain View`, `London`];
const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MAX_DESCRIPTION_SENTENCES = 5;
const PHOTO_URLS = [`img/photos/1.jpg`, `img/photos/2.jpg`, `img/photos/3.jpg`, `img/photos/4.jpg`, `img/photos/5.jpg`];

const generateDescription = () => {
  const destinations = DESCRIPTION.split(`.`).slice(0, -1);
  let destination = shuffleArray(destinations).slice(0, MAX_DESCRIPTION_SENTENCES).join(`.`);
  destination = destination.length ? destination + `.` : ``;
  return destination;
};

const generatePhotos = () => {
  return shuffleArray(PHOTO_URLS).slice(0, getRandomInteger(0, PHOTO_URLS.length));
};

const createDestination = (destination) => {
  return {
    name: destination,
    description: generateDescription(),
    photos: generatePhotos()
  };
};

export const generateDestinations = () => {
  let cities = [];
  DESTINATIONS.forEach((destination) => {
    cities.push(createDestination(destination));
  });
  return cities;
};
