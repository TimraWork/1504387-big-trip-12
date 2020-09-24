import MenuView from "../view/menu.js";
import EventNewButtonView from "../view/event-new-button.js";

import {render} from "../utils/render.js";
import {RenderPosition, MenuItem} from "../const.js";

export default class Menu {
  constructor(container, titleMenu, tripPresenter, statisticsPresenter) {
    this._container = container;
    this._titleMenu = titleMenu;

    this._tripPresenter = tripPresenter;
    this._statisticsPresenter = statisticsPresenter;

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
    this._statisticsPresenter.destroy(); // Скрыть статистику
    // siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
    this._menuComponent.setMenuItem(MenuItem.TABLE);
  }

  _handleEventNewButtonClick() {
    this._statisticsPresenter.destroy(); // Скрыть статистику
    this._tripPresenter.init(); // Показать доску
    this._tripPresenter.createEvent(this._handleEventNewFormClose); // Показать форму добавления новой задачи
  }

  _handleMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.TABLE:
        this._statisticsPresenter.destroy();
        this._tripPresenter.init();
        break;
      case MenuItem.STATS:
        this._tripPresenter.destroy();
        this._statisticsPresenter.init();
        break;
    }
  }

}
