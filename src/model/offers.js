import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          // dateRange: [new Date(event.date_from), new Date(event.date_to)],
          // isFavorite: event.is_favorite,
          // price: event.base_price,
        }
    );

    // delete adaptedEvent.is_favorite;
    // delete adaptedEvent.date_from;
    // delete adaptedEvent.date_to;
    // delete adaptedEvent.base_price;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          // "date_from": event.dateRange[0].toISOString(),
          // "date_to": event.dateRange[1].toISOString(),
          // "is_favorite": event.isFavorite,
          // "repeating_days": event.repeating,
          // "base_price": event.price
        }
    );

    // delete adaptedEvent.dateRange;
    // delete adaptedEvent.isFavorite;
    // delete adaptedEvent.price;

    return adaptedEvent;
  }
}
