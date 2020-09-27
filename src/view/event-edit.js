import SmartView from "./smart.js";
import {EventType} from '../const.js';
import {formatDateTime} from '../utils/common.js';
import {formatEventType, capitalizeFirstLetter, getOffers, validateDestination, validatePrice, validateDate} from '../utils/event.js';

import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  type: `sightseeing`,
  dateRange: [new Date(), new Date()],
  offers: [],
  destination: {
    name: ``,
    description: ``,
    photos: []
  },
  price: ``,
  isFavorite: false
};

const createPhotosTemplate = (photos) => {
  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${photos
                  .map((photo)=> {
                    return `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
                  })
                  .join(``)}
            </div>
          </div>`;
};

const createFavoriteButtonTemplate = (id, isFavorite, isDisabled) => {
  return `<input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
            <label class="event__favorite-btn" for="event-favorite-${id}">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
              </svg>
            </label>`;
};

const createEventTypeTemplate = (id, eventType, isDisabled) => {
  return `<div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">

              ${Object.entries(EventType)
                .slice(0, 2)
                .map(([typeName, typeValues]) => {

                  return `
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">${typeName}Transfer</legend>

                        ${typeValues
                            .map((typeValue) => {
                              typeValue = typeValue.NAME;
                              return `<div class="event__type-item">
                                        <input id="event-type-${typeValue}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeValue}" ${eventType === typeValue ? `checked` : `` } ${isDisabled ? `disabled` : ``}>
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

const createDestinationTemplate = (destination) => {
  const {description, photos} = destination;
  const photosTemplate = createPhotosTemplate(photos);

  if (photos.length || description.length) {

    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>
              ${photosTemplate}
            </section>`;
  }
  return ``;
};

const createDestinationsTemplate = (id, destinations, isDisabled) => {
  return `<datalist id="destination-list-${id}">
            ${destinations
              .map((destination)=>{
                return `<option value="${destination.name}" ${isDisabled ? `disabled` : ``}>${destination.name}</option>`;
              })
              .join(``)}
          </datalist>`;
};

const createOfferItemTemplate = (id, offer, isChecked) => {
  const {title, price} = offer;
  const checked = isChecked ? `checked` : ``;

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden" id="event-offer-${title}-${id}" type="checkbox" ${checked} data-title="${title}" data-price="${price}">
            <label class="event__offer-label" for="event-offer-${title}-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${price}</span>
            </label>
          </div>`;
};

const createOffersTemplate = (id = 1, offers, dataOffers, type) => {
  const offersByType = getOffers(dataOffers, type);
  let isChecked = false;

  if (offersByType.length) {

    return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${offersByType
                  .map((offer) => {
                    isChecked = offers.find((of) => of.title === offer.title) ? true : false;
                    return createOfferItemTemplate(id, offer, isChecked, dataOffers);
                  })
                  .join(``)}
              </div>
            </section>`;
  }

  return ``;
};

const createEventEditTemplate = (data, dataOffers, dataDestinations, isNewEvent) => {
  const {
    id,
    type,
    destination,
    offers,
    price,
    dateRange,
    isFavorite,
    isDisabled,
    isSaving,
    isDeleting} = data;

  const typeWithLabel = formatEventType(type);

  const startDateTime = formatDateTime(dateRange[0]);
  const endDateTime = formatDateTime(dateRange[1]);

  const destinationTemplate = createDestinationTemplate(destination, dataDestinations, isDisabled);
  const offersTemplate = createOffersTemplate(id, offers, dataOffers, type, isDisabled);
  const destinationsTemplate = createDestinationsTemplate(id, dataDestinations, isDisabled);
  const favoriteButtonTemplate = createFavoriteButtonTemplate(id, isFavorite, isDisabled);
  const eventTypeTemplate = createEventTypeTemplate(id, type);

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">

              ${eventTypeTemplate}

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-${id}">${typeWithLabel}</label>
                <input required="required" autocomplete="off" class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}" ${isDisabled ? `disabled` : ``}>
                ${destinationsTemplate}
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-${id}">
                  From
                </label>
                <input required class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startDateTime}" ${isDisabled ? `disabled` : ``}>
                &mdash;
                <label class="visually-hidden" for="event-end-time-${id}">
                  To
                </label>
                <input required  class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endDateTime}" ${isDisabled ? `disabled` : ``}>
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-${id}">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input required type="number" min="1" class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}" ${isDisabled ? `disabled` : ``}>
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? `Saving...` : `Save`}</button>

              ${isNewEvent ? `<button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``} >Cancel</button>` : `
                              <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``} >${isDeleting ? `Deleting...` : `Delete`}</button>
                              ${favoriteButtonTemplate}
                              <button class="event__rollup-btn" type="button">
                                <span class="visually-hidden">Open event</span>
                              </button>`}

            </header>

            ${ (offersTemplate || destinationTemplate) ? `<section class="event__details">
                  ${offersTemplate}
                  ${destinationTemplate}
                </section>` : ``}

          </form>`;
};

export default class EventEdit extends SmartView {
  constructor(offers, destinations, event = BLANK_EVENT, isNewEvent = false) {
    super();
    this._data = EventEdit.parseEventToData(event);

    this._startDatepicker = null;
    this._endDatepicker = null;

    this._offers = offers;
    this._destinations = destinations;
    this._isNewEvent = isNewEvent;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._formResetHandler = this._formResetHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._changeTypeInputHandler = this._changeTypeInputHandler.bind(this);
    this._changeDestinationInputHandler = this._changeDestinationInputHandler.bind(this);
    this._changePriceInputHandler = this._changePriceInputHandler.bind(this);
    this._changeOffersClickHandler = this._changeOffersClickHandler.bind(this);

    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._offers, this._destinations, this._isNewEvent);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormResetHandler(this._callback.formReset);
    this.setFormCloseClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`.event__type-input`)
      .forEach((input) => {
        input.addEventListener(`input`, this._changeTypeInputHandler);
      });

    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._changeDestinationInputHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._changePriceInputHandler);

    const offersNodes = this.getElement().querySelector(`.event__available-offers`);

    if (offersNodes) {
      offersNodes.querySelectorAll(`.event__offer-checkbox`)
      .forEach((checkbox) => {
        checkbox.addEventListener(`click`, this._changeOffersClickHandler);
      });
    }

    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  _changeOffersClickHandler() {
    const offers = [];

    this.getElement().querySelectorAll(`.event__offer-checkbox`)
      .forEach((checkbox) => {
        if (checkbox.checked) {
          offers.push(
              {
                title: checkbox.dataset.title,
                price: +checkbox.dataset.price
              });
        }
      });

    this.updateData({
      offers
    }, true);
  }

  _setDatepicker(datepicker, inputElement, dataDatepicker, handler, isMinDateEnable) {
    if (datepicker) {
      datepicker.destroy();
      datepicker = null;
    }
    if (dataDatepicker) {
      datepicker = flatpickr(
          inputElement,
          {
            dateFormat: `d/m/y H:i`,
            defaultDate: dataDatepicker,
            enableTime: true,
            minDate: isMinDateEnable ? this._data.dateRange[0] : ``,
            onChange: handler,
            allowInput: isMinDateEnable
          }
      );
    }
    return datepicker;
  }

  _setStartDatepicker() {
    const inputElement = this.getElement().querySelector(`.event__input--time[name = event-start-time]`);

    this._startDatepicker = this._setDatepicker(
        this._startDatepicker,
        inputElement,
        this._data.dateRange[0],
        this._startDateChangeHandler
    );

    const form = this.getElement();
    const input = form.querySelector(`.event__input--time[name = event-end-time]`);

    validateDate(this._data.dateRange, form, input);
  }

  _setEndDatepicker() {
    const inputElement = this.getElement().querySelector(`.event__input--time[name = event-end-time]`);

    this._endDatepicker = this._setDatepicker(
        this._endDatepicker,
        inputElement,
        this._data.dateRange[1],
        this._endDateChangeHandler,
        true
    );

    if (inputElement) {
      inputElement.addEventListener(`focus`, function () {
        inputElement.readOnly = true;
      });
    }
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      dateRange: [userDate, this._data.dateRange[1]]
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dateRange: [this._data.dateRange[0], userDate]
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data, this._offers, this._destinations));
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this.reset(this._data);
    this._callback.formReset();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();

    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _formCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _changeTypeInputHandler(evt) {
    this.updateData({
      type: evt.target.value,
      offers: []
    });
  }

  _changeDestinationInputHandler(evt) {
    const currentDestination = this._destinations.find((destination) => destination.name === evt.target.value);

    const callback = () => {
      this.updateData({
        destination: {
          name: currentDestination.name,
          description: currentDestination.description,
          photos: currentDestination.photos
        }
      });
    };

    validateDestination(evt.target, this.getElement(), this._destinations, callback);
  }

  _changePriceInputHandler(evt) {
    const callback = () => {
      this.updateData({
        price: +evt.target.value
      }, true);
    };

    validatePrice(evt.target, this.getElement(), callback);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormCloseClickHandler(callback) {
    if (!this._isNewEvent) {
      this._callback.closeClick = callback;
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseClickHandler);
    }
  }

  setFormResetHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().addEventListener(`reset`, this._formResetHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  setFavoriteClickHandler(callback) {
    if (!this._isNewEvent) {
      this._callback.favoriteClick = callback;
      this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
    }
  }

  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  static parseEventToData(event) {
    const parsedEvent = Object.assign(
        {},
        event,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        });
    return parsedEvent;
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
