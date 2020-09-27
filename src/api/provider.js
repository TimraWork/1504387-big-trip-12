import {nanoid} from "nanoid";
import EventsModel from "../model/events.js";
import OffersModel from "../model/offers.js";
import DestinationsModel from "../model/destinations.js";

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.event);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    const storeStructure = Object.assign({}, acc, {
      [current.id]: current,
    });

    return storeStructure;
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (this._isOnline()) {

      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map(EventsModel.adaptToServer));
          this._store.setItems(items);
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getItems());

    return Promise.resolve(storeEvents.map(EventsModel.adaptToClient));
  }

  getOffers() {
    if (this._isOnline()) {

      return this._api.getOffers()
        .then((offers) => {
          this._store.setItems(offers.map(OffersModel.adaptToServer));

          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems());

    return Promise.resolve(storeOffers.map(OffersModel.adaptToClient));
  }

  getDestinations() {
    if (this._isOnline()) {

      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItems(destinations.map(DestinationsModel.adaptToServer));

          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems());

    return Promise.resolve(storeDestinations.map(DestinationsModel.adaptToClient));
  }

  updateEvent(event) {
    if (this._isOnline()) {

      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._store.setItem(updatedEvent.id, EventsModel.adaptToServer(updatedEvent));

          return updatedEvent;
        });
    }

    this._store.setItem(event.id, EventsModel.adaptToServer(Object.assign({}, event)));

    return Promise.resolve(event);
  }

  addEvent(event) {
    if (this._isOnline()) {

      return this._api.addEvent(event)
        .then((newEvent) => {
          this._store.setItem(newEvent.id, EventsModel.adaptToServer(newEvent));

          return newEvent;
        });
    }

    const localNewEventId = nanoid();

    const localNewEvent = Object.assign({}, event, {id: localNewEventId});

    this._store.setItem(localNewEvent.id, EventsModel.adaptToServer(localNewEvent));

    return Promise.resolve(localNewEvent);
  }

  deleteEvent(event) {
    if (this._isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._store.removeItem(event.id));
    }

    this._store.removeItem(event.id);

    return Promise.resolve();
  }

  sync() {
    if (this._isOnline()) {
      const storeEvents = Object.values(this._store.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);

          const items = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
