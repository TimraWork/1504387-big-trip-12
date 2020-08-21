import {createElement} from '../utils.js';

const createEventsHistoryTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventsHistory {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createEventsHistoryTemplate(this._events);
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
