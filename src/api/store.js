import {STORE_NAMES} from '../const.js';
export default class Store {
  constructor(storage) {
    this._storage = storage;
  }

  getItems(key) {
    try {
      return JSON.parse(this._storage.getItem(key)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(key, items) {
    this._storage.setItem(
        key,
        JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.getItems(STORE_NAMES[0]);

    this._storage.setItem(
        STORE_NAMES[0],
        JSON.stringify(
            Object.assign(
                {},
                store,
                {
                  [key]: value
                })
        )
    );
  }

  removeItem(key) {
    const store = this.getItems(STORE_NAMES[0]);

    delete store[key];

    this._storage.setItem(
        STORE_NAMES[0],
        JSON.stringify(store)
    );
  }
}
