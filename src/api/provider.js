import {nanoid} from "nanoid";
import EventsModel from "../model/events.js";
import OffersModel from "../model/offers.js";
import DestinationsModel from "../model/destinations.js";

const STORE_NAME = `bigtrip`;
const STORE_PREFIXES = [`events`, `offers`, `destinations`];
const STORE_VER = `v12`;
const STORE_NAMES = STORE_PREFIXES.map((store) => `${STORE_NAME}-` + store + `-${STORE_VER}`);

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.event);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current, index) => {
    // console.log(`current = `, [current.id]);
    const currentId = current.id || index;
    const storeStructure = Object.assign({}, acc, {
      [currentId]: current,
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
          this._store.setItems(STORE_NAMES[0], items);
          // console.log(`events`, events);
          return events;
        });
    }

    // console.log(`isOffline`);
    const storeEvents = Object.values(this._store.getItems(STORE_NAMES[0]));

    return Promise.resolve(storeEvents.map(EventsModel.adaptToClient));
  }

  getOffers() {
    if (this._isOnline()) {

      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers.map(OffersModel.adaptToServer));
          this._store.setItems(STORE_NAMES[1], items);
          // console.log(`offers`, offers);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems(STORE_NAMES[1]));

    return Promise.resolve(storeOffers.map(OffersModel.adaptToClient));
  }

  getDestinations() {
    if (this._isOnline()) {

      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations.map(DestinationsModel.adaptToServer));
          this._store.setItems(STORE_NAMES[2], items);
          // console.log(`destinations`, destinations);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems(STORE_NAMES[2]));

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
