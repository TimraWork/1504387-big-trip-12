import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(offer) {
    const adaptedOffer = Object.assign(
        {},
        offer,
        {
          // isFavorite: event.is_favorite,
        }
    );

    // delete adaptedOffer.is_favorite;

    return adaptedOffer;
  }

  static adaptToServer(event) {
    const adaptedOffer = Object.assign(
        {},
        event,
        {
          // "is_favorite": event.isFavorite,
        }
    );

    // delete adaptedEvent.isFavorite;

    return adaptedOffer;
  }
}
