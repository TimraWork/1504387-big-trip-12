import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn" href="#" data-value="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
            <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATS}">${MenuItem.STATS}</a>
          </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.value);
    this.setMenuItem(evt.target.dataset.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;

    this.getElement().querySelectorAll(`.trip-tabs__btn`)
      .forEach((button) => {
        return button.addEventListener(`click`, this._menuClickHandler);
      });
  }

  setMenuItem(menuItem) {
    this.getElement()
      .querySelectorAll(`.trip-tabs__btn`)
      .forEach((button) => {
        button.classList.remove(`trip-tabs__btn--active`);
      });

    const item = this.getElement().querySelector(`[data-value=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
