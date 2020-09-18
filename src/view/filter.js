import AbstractView from './abstract.js';

const createFilterTemplate = (current, filters) => {
  return `<form class="trip-filters" action="#" method="get">
          ${filters
            .map((filterValue) => {
              const {type, count} = filterValue;
              return `<div class="trip-filters__filter">
                        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === current ? `checked` : ``}  ${count === 0 ? `disabled` : ``}>
                        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                      </div>`;
            }).join(``)}

            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class Filter extends AbstractView {
  constructor(currentFilterType, filters) {
    super();
    this._currentFilter = currentFilterType;
    this._filters = filters;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._currentFilter, this._filters);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
