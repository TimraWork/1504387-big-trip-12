import {getRandomInteger} from '../utils/common.js';
import {OFFERS_DATA} from '../const.js';

export const generateOffers = () => {
  const offers = OFFERS_DATA.map((offer) => {

    return Object.assign(
        {},
        offer,
        {
          price: getRandomInteger(0, 200, 10)
        });
  });

  return offers;
};
