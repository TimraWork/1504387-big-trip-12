import MenuView from "../view/menu.js";
import EventNewButtonView from "../view/event-new-button.js";

import {render} from "../utils/render.js";
import {RenderPosition, MenuItem} from "../const.js";

export default class Menu {
  constructor(container, titleMenu, tripPresenter) {
    this._container = container;
    this._titleMenu = titleMenu;

    this._tripPresenter = tripPresenter;

    this._handleEventNewButtonClick = this._handleEventNewButtonClick.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);
    this._handleEventNewFormClose = this._handleEventNewFormClose.bind(this);

    this._menuComponent = new MenuView();
    this._eventNewButtonComponent = new EventNewButtonView();
  }

  init() {
    render(this._container, this._eventNewButtonComponent, RenderPosition.BEFORE_END);
    render(this._titleMenu, this._menuComponent, RenderPosition.AFTER_END);

    this._menuComponent.setMenuClickHandler(this._handleMenuClick);
    this._eventNewButtonComponent.setEventNewClickHandler(this._handleEventNewButtonClick);
  }

  _handleEventNewFormClose() {
    // siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
    this._menuComponent.setMenuItem(MenuItem.TABLE);
  }

  _handleEventNewButtonClick() {
    // Показать форму добавления новой задачи
    this._tripPresenter.init();

    this._tripPresenter.createEvent(this._handleEventNewFormClose); // ?
    // Скрыть статистику
    // Показать доску
  }

  _handleMenuClick(menuItem) {
    // console.log(`menu = `, menuItem);
    switch (menuItem) {
      case MenuItem.TABLE:
        // Показать доску
        this._tripPresenter.init();
        // Скрыть статистику
        break;
      case MenuItem.STATS:
        // Скрыть доску
        this._tripPresenter.destroy();
        // Показать статистику
        break;
    }
  }

}
