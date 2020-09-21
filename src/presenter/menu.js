import MenuView from "../view/menu.js";
import EventNewButtonView from "../view/event-new-button.js";

import {render} from "../utils/render.js";
import {RenderPosition} from "../const.js";

export default class Menu {
  constructor(container, titleMenu, tripPresenter) {
    this._container = container;
    this._titleMenu = titleMenu;

    this._tripPresenter = tripPresenter;

    this._handleEventNewButtonClick = this._handleEventNewButtonClick.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);
  }

  init() {
    this._menuComponent = new MenuView();
    this._eventNewButtonComponent = new EventNewButtonView();

    render(this._container, this._eventNewButtonComponent, RenderPosition.BEFORE_END);
    render(this._titleMenu, this._menuComponent, RenderPosition.AFTER_END);

    this._menuComponent.setMenuClickHandler(this._handleMenuClick);
    this._eventNewButtonComponent.setEventNewClickHandler(this._handleEventNewButtonClick);
  }

  _handleEventNewButtonClick() {
    this._tripPresenter.createEvent();
  }

  _handleMenuClick(){
    console.log('menu = ', );
  }
}
