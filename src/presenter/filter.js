import FilterView from "../view/filter.js";
import {render, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {RenderPosition, UpdateType, FilterType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;
    const filters = this._getFilters();

    this._filterComponent = new FilterView(this._currentFilter, filters);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTER_END);

      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const events = this._eventsModel.getEvents();
    const filters = [];

    Object.values(FilterType).map((typeValues) => {
      filters.push({
        type: typeValues,
        count: filter[typeValues](events).length
      });
    });

    return filters;
  }
}
