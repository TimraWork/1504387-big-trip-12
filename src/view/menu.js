import AbstractView from "./abstract.js";

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn" href="#">Table</a>
            <a class="trip-tabs__btn" href="#">Stats</a>
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

    this._callback.menuClick();

    evt.target.classList.add(`trip-tabs__btn--active`);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;

    this.getElement().querySelectorAll(`.trip-tabs__btn`)
      .forEach((button) => button.addEventListener(`click`, this._menuClickHandler));
  }

  setMenuActiveClass() {

  }
}
