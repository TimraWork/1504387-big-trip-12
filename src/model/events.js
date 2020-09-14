import Observer from "../utils/observer.js";

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(events) {
    this._events = events.slice();
  }

  getOffers() {
    return this._events;
  }
}
