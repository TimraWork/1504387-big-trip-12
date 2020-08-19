import {createElement} from '../utils.js';
import {getEventsCitiesTitles, getEventsDates, getEventsTotalPrice} from '../utils.js';

const createInfoTemplate = (events) => {

  const cities = getEventsCitiesTitles(events);
  const dates = getEventsDates(events);
  const total = getEventsTotalPrice(events);

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

export default class Info {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
