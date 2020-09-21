import AbstractView from "./abstract.js";

const createEventNewButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class EventNewButton extends AbstractView {
  constructor() {
    super();

    this._eventNewClickHandler = this._eventNewClickHandler.bind(this);
  }

  getTemplate() {
    return createEventNewButtonTemplate();
  }

  _eventNewClickHandler(evt) {
    evt.preventDefault();
    this._callback.eventNewClick();
  }

  setEventNewClickHandler(callback) {
    this._callback.eventNewClick = callback;
    this.getElement().addEventListener(`click`, this._eventNewClickHandler);
  }

  setDisabled() {
    // this.getElement().disabled = true;
    document.querySelector(`.trip-main__event-add-btn`).setAttribute(`disabled`, `true`);
  }

  setEnabled() {
    // this.getElement().removeAttribute(`disabled`);
    document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
  }
}
