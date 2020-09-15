import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import EventsHistoryView from "../view/events-history.js";
import EventDayView from "../view/event-day.js";

import EventPresenter from "./event.js";

import {getTripDays, filterEventsByDays} from '../utils/event.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';
import {sortTime, sortPrice} from "../utils/event.js";
import {updateItem} from "../utils/common.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel, offersModel, destinationsModel) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};
    this._tripDayNodes = [];
    this._dayNode = null;

    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
    this._EventsHistoryComponent = new EventsHistoryView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel = eventsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._tripDays = this._getTripDays(this._currentSortType);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getTripDays(currentSortType) {
    return currentSortType === SortType.DEFAULT ? getTripDays(this._getEvents()) : undefined;
  }

  _getEvents() {
    this._events = this._eventsModel.getEvents().slice();

    switch (this._currentSortType) {
      case SortType.PRICE:
        return this._events.sort(sortPrice);
      case SortType.TIME:
        return this._events.sort(sortTime);
      default:
        return this._events;
    }
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data, this._getOffers(), this._getDestinations());
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._tripDays = this._getTripDays(this._currentSortType);

    this._clearTrip();
    this._renderTrip();
  }

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    this._tripDayNodes = [];

    remove(this._EventsHistoryComponent);
    remove(this._sortComponent);
    remove(this._noEventComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _createEventNode(event, dayNode) {
    const eventPresenter = new EventPresenter(dayNode, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event, this._getOffers(), this._getDestinations());

    this._eventPresenter[event.id] = eventPresenter;
  }

  _createDaysNode() {
    const tripDaysNode = this._EventsHistoryComponent.getElement();
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
    render(this._tripContainer, this._createEventsListNode(), RenderPosition.BEFORE_END);
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.AFTER_END);
  }

  _renderTrip() {
    const eventCount = this._getEvents().length;

    if (eventCount === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEvents();
  }
}
