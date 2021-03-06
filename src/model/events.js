import Observer from "../utils/observer.js";

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this._notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          dateRange: [new Date(event.date_from), new Date(event.date_to)],
          isFavorite: event.is_favorite,
          price: event.base_price,
          destination: {
            name: event.destination.name,
            description: event.destination.description,
            photos: event.destination.pictures
          }
        }
    );

    delete adaptedEvent.is_favorite;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.base_price;
    delete adaptedEvent.destination.pictures;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          "date_from": event.dateRange[0].toISOString(),
          "date_to": event.dateRange[1].toISOString(),
          "is_favorite": event.isFavorite,
          "repeating_days": event.repeating,
          "base_price": event.price,
          "destination": {
            "name": event.destination.name,
            "description": event.destination.description,
            "pictures": event.destination.photos
          },
        }
    );

    delete adaptedEvent.dateRange;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.price;
    delete adaptedEvent.destination.photos;

    return adaptedEvent;
  }
}
