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
    const store = this.getItems(key);

    this._storage.setItem(
        key,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeItem(key) {
    const store = this.getItems(key);

    delete store[key];

    this._storage.setItem(
        key,
        JSON.stringify(store)
    );
  }
}
