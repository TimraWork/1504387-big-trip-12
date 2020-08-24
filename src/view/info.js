import {getEventsCitiesTitles, getEventsDates, getEventsTotalPrice} from '../utils/event.js';
import Abstract from './abstract.js';

const createCitiesDatesTemplate = (events) => {
  if (events.length) {
    const cities = getEventsCitiesTitles(events);
    const dates = getEventsDates(events);
    return (`<div class="trip-info__main">
              <h1 class="trip-info__title">${cities}</h1>

              <p class="trip-info__dates">${dates}</p>
            </div>`);
  }
  return ``;
};

const createInfoTemplate = (events) => {

  const citiesDatesTemplate = createCitiesDatesTemplate(events);
  const total = getEventsTotalPrice(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${citiesDatesTemplate}

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
      </p>
    </section>`
  );
};

export default class Info extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }
}
