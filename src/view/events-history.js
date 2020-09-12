import AbstractView from './abstract.js';

const createEventsHistoryTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventsHistory extends AbstractView {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createEventsHistoryTemplate(this._events);
  }
}
