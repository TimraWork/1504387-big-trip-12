import {createElement, formatTime, formatDateTime, getDuration, formatEventType} from '../utils.js';
import {MAX_OFFERS} from '../const.js';

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
          .filter((offer)=> offer.isChecked === true)
          .slice(0, MAX_OFFERS)
          .map((offer)=> createOfferTemplate(offer.label, offer.price))
          .join(``)}
    </ul>`;
  }

  return ``;
};

const createEventTemplate = ({type, city, dateRange, price}) => {

  const {name: eventType, offers} = type;
  const {name: evenCity} = city;

  const typeWithLabel = formatEventType(type.name);
  const startTime = formatTime(dateRange[0]);
  const endTime = formatTime(dateRange[1]);
  const startDateTime = formatDateTime(dateRange[0]);
  const endDateTime = formatDateTime(dateRange[1]);
  const duration = getDuration(dateRange);

  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeWithLabel} ${evenCity}</h3>

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
    </li>`
  );
};

export default class Event {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._events);
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
