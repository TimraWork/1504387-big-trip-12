import SortView from "../view/sort.js";
import EventNewButtonView from "../view/event-new-button.js";
import EventsHistoryView from "../view/events-history.js";
import EventDayView from "../view/event-day.js";
import NoEventView from "../view/no-event.js";
import LoadingView from "../view/loading.js";

import EventPresenter, {State as EventPresenterViewState} from "./event.js";
import EventNewPresenter from "./event-new.js";

import {getTripDays, filterEventsByDays} from '../utils/event.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';
import {sortTime, sortPrice} from "../utils/event.js";
import {filter} from "../utils/filter.js";

import {SortType, UpdateType, UserAction, FilterType} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel, offersModel, destinationsModel, filterModel, api) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};
    this._tripDayNodes = [];
    this._dayNode = null;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = new SortView();
    this._eventNewButtonComponent = new EventNewButtonView();
    this._noEventComponent = new NoEventView();
    this._eventsHistoryComponent = new EventsHistoryView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel = eventsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filterModel = filterModel;

    this._eventNewPresenter = new EventNewPresenter(this._tripContainer, this._handleViewAction);
  }

  init() {
    this.destroy();

    this._renderTrip();

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._setDefaultSettings();

    this._clearTrip({resetSortType: true});

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._setDefaultSettings();

    this._eventNewPresenter.init(this._tripOffers, this._tripDestinations, callback);
  }

  _setDefaultSettings() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
  }

  _getTripDays(currentSortType) {
    return currentSortType === SortType.DEFAULT ? getTripDays(this._getEvents()) : undefined;
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    this._events = this._eventsModel.getEvents().slice();
    const filteredEvents = filter[filterType](this._events);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filteredEvents.sort(sortPrice);
      case SortType.TIME:
        return filteredEvents.sort(sortTime);
      default:
        return filteredEvents;
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update)
          .then((response) => {
            this._eventsModel.addEvent(updateType, response);
          })
          .catch(() => {
            this._eventNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, update);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data, this._tripOffers, this._tripDestinations);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearTrip();
    this._renderTrip();
  }

  _createEventNode(event, dayNode) {
    const eventPresenter = new EventPresenter(dayNode, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event, this._tripOffers, this._tripDestinations);

    this._eventPresenter[event.id] = eventPresenter;
  }

  _createDaysNode() {
    this._tripDays = this._getTripDays(this._currentSortType);

    const tripDaysNode = this._eventsHistoryComponent.getElement();

    if (this._tripDays) {

      this._tripDays.forEach((day, index) => {
        const eventDay = new EventDayView(day, index + 1);
        this._tripDayNodes.push(eventDay.getDayContainer());

        tripDaysNode.appendChild(eventDay.getElement());
      });
    } else {
      const eventDay = new EventDayView(this._tripDays);
      this._tripDayNodes.push(eventDay.getDayContainer());

      tripDaysNode.appendChild(eventDay.getElement());
    }

    return tripDaysNode;
  }

  _createEventsListNode() {
    const eventsListNode = this._createDaysNode();

    this._tripDayNodes.forEach((dayNode) => {

      this._dayNode = dayNode;

      const filteredEventsByDay = dayNode.dataset.day ?
        filterEventsByDays(this._getEvents(), dayNode.dataset.day) :
        this._getEvents();

      filteredEventsByDay.forEach((event) => {
        this._createEventNode(event, this._dayNode);
      });
    });

    return eventsListNode;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderEvents() {
    this._tripOffers = this._getOffers();
    this._tripDestinations = this._getDestinations();

    render(this._tripContainer, this._createEventsListNode(), RenderPosition.BEFORE_END);
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTER_END);
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.AFTER_END);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());

    this._eventPresenter = {};
    this._tripDayNodes = [];

    remove(this._eventsHistoryComponent);
    remove(this._sortComponent);
    remove(this._noEventComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const eventCount = this._getEvents().length;

    if (eventCount === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEvents();
  }
}
