import {getEventCities, getEventDates, getTotalPrice} from '../utils.js';

export const createInfoTemplate = (events) => {

  const cities = getEventCities(events);
  const dates = getEventDates(events);
  const total = getTotalPrice(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <!--<h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>-->
        <h1 class="trip-info__title">${cities}</h1>

        <p class="trip-info__dates">${dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
      </p>
    </section>`
  );
};
