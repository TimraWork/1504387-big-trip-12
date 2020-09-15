import AbstractView from './abstract.js';
import {SortType} from '../const.js';

const createSortTemplate = (currentSortType) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day">Day</span>

            ${Object.values(SortType)
                .map((sortValue) => {
                  return `<div class="trip-sort__item trip-sort__item--${sortValue}">
                            <input id="sort-${sortValue}" class="trip-sort__input  visually-hidden" type="radio" data-sort-type="${sortValue}" name="trip-sort" value="sort-${sortValue}" ${currentSortType === sortValue ? `checked` : ``}>
                            <label class="trip-sort__btn" for="sort-${sortValue}">${sortValue}</label>
                            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                            </svg>
                          </div>`;
                }).join(``)}
            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
          </form>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
