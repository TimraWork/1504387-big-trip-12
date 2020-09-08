import AbstractView from './abstract.js';
import {EVENT_TYPE} from '../const.js';
import {formatDateTime} from '../utils/common.js';
import {formatEventType, capitalizeFirstLetter} from '../utils/event.js';

const BLANK_EVENT = {
  type: {
    name: EVENT_TYPE.transfers[0],
    offers: [],
  },
  dateRange: [new Date(), new Date()],
  city: {
    name: ``,
    destination: ``,
    photos: [],
  },
  price: 0,
  isFavorite: false
};

const createOfferItemTemplate = ({name, isChecked, label, price}) => {
  const checked = isChecked ? `checked` : ``;

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}" ${checked}>
            <label class="event__offer-label" for="event-offer-${name}-1">
              <span class="event__offer-title">${label}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${price}</span>
            </label>
          </div>`;
};

const createOffersTemplate = (offers) => {
  if (offers.length) {

    return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${offers
                  .map((offer)=> createOfferItemTemplate(offer))
                  .join(``)}
              </div>
            </section>`;
  }

  return ``;
};

const createPhotosTemplate = (photos) => {
  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${photos
                  .map((photo)=> {
                    return `<img class="event__photo" src="${photo}" alt="Event photo">`;
                  })
                  .join(``)}
            </div>
          </div>`;
};

const createDestinationTemplate = ({name, photos, destination}) => {
  const photosTemplate = createPhotosTemplate(photos);

  if (name.length) {

    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination}</p>
              ${photosTemplate}
            </section>`;
  }

  return ``;
};

const createFavoriteButtonTemplate = (id, isFavorite) => {
  return `<input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
            <label class="event__favorite-btn" for="event-favorite-${id}">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
              </svg>
            </label>`;
};

const createEventTypeTemplate = (id, eventType) => {
  return `<div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">


            <div class="event__type-list">
            ${Object.entries(EVENT_TYPE)
              .slice(0, 2)
              .map(([typeName, typeValues]) => {
                return `
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">${typeName}Transfer</legend>

                      ${typeValues
                          .map((typeValue) => {
                            return `<div class="event__type-item">
                                      <input id="event-type-${typeValue}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeValue}" ${eventType === typeValue ? `checked` : ``}>
                                      <label class="event__type-label  event__type-label--${typeValue}" for="event-type-${typeValue}-${id}">${capitalizeFirstLetter(typeValue)}</label>
                                    </div>`;
                          })
                          .join(``)}
                    </fieldset>`;
              })
              .join(``)}
              </div>
            </div>`;
};

const createEventFormTemplate = (data) => {
  const {id, type, city, price, dateRange, isFavorite} = data;
  const {name: eventType, offers} = type;
  const {name: eventCity} = city;

  const typeWithLabel = formatEventType(eventType);
  const startDateTime = formatDateTime(dateRange[0]);
  const endDateTime = formatDateTime(dateRange[1]);

  const destinationTemplate = createDestinationTemplate(city);
  const offersTemplate = createOffersTemplate(offers);
  const favoriteButtonTemplate = createFavoriteButtonTemplate(id, isFavorite);
  const eventTypeTemplate = createEventTypeTemplate(id, eventType);

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">

              ${eventTypeTemplate}

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">${typeWithLabel}</label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventCity}" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="Saint Petersburg"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateTime}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateTime}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>

              ${favoriteButtonTemplate}

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>

            </header>

            ${ (offersTemplate || destinationTemplate) ? `<section class="event__details">
                  ${offersTemplate}
                  ${destinationTemplate}
                </section>` : ``}

          </form>`;
};

export default class EventEdit extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = EventEdit.parseEventToData(event); // Static method call
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventFormTemplate(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _formResetHandler(evt) {
    evt.preventDefault(this._event);
    this._callback.formReset();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _formCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseClickHandler);
  }

  setFormResetHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().addEventListener(`reset`, this._formResetHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    return data;
  }
}
