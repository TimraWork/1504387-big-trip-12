import InfoView from '../view/info.js';

import {render, replace, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class Info {
  constructor(container, eventsModel, offersModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._offersModel = offersModel;

    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const events = this._eventsModel.getEvents();
    const offers = this._offersModel.getOffers();

    const prevInfoComponent = this._infoComponent;
    this._infoComponent = new InfoView(events, offers);

    if (prevInfoComponent === null) {
      render(this._container, this._infoComponent, RenderPosition.AFTER_BEGIN);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}

