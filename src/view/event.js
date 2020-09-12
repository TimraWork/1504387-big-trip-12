import {MAX_OFFERS} from '../const.js';
import AbstractView from './abstract.js';

import {formatTime, formatDateTime} from '../utils/common.js';
import {formatEventType, getEventDuration, getOffersByData} from '../utils/event.js';

const createOfferTemplate = (label, price) => {
  return `<li class="event__offer">
            <span class="event__offer-title">${label}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${price}</span>
          </li>`;
};

const createOffersTemplate = (offers) => {
  if (offers.length) {

    return `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${ offers
                  .slice(0, MAX_OFFERS)
                  .map((offer)=> createOfferTemplate(offer.label, offer.price))
                  .join(``)}
            </ul>`;
  }

  return ``;
};

const createEventTemplate = (event, dataOffers) => {

  const {type, destination, dateRange, price, offers} = event;

  const typeWithLabel = formatEventType(type);
  const startTime = formatTime(dateRange[0]);
  const endTime = formatTime(dateRange[1]);
  const startDateTime = formatDateTime(dateRange[0]);
  const endDateTime = formatDateTime(dateRange[1]);
  const duration = getEventDuration(dateRange);

  const offersTemplate = createOffersTemplate(getOffersByData(offers, dataOffers));

  return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${typeWithLabel} ${destination}</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${startDateTime}">${startTime}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${endDateTime}">${endTime}</time>
                </p>
                <p class="event__duration">${duration}</p>
              </div>

              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>

              ${offersTemplate}

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class Event extends AbstractView {
  constructor(event, offers) {
    super();
    this._event = event;
    this._offers = offers;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event, this._offers);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
