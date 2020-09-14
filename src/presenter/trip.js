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
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel, offersModel, destinationsModel) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};
    this._tripDayNodes = [];
    this.dayNode = null;

    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
    this._EventsHistoryComponent = new EventsHistoryView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel = eventsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
  }

  _getEvents() {
    return this.eventsModel.getEvents();
  }

  _getOffers() {
    return this.offersModel.getOffers();
  }

  _getDestinations() {
    return this.destinationsModel.getDestinations();
  }

  init(tripEvents, tripOffers, tripDestinations) {
    this._tripOffers = tripOffers;
    this._tripDestinations = tripDestinations;

    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();

    this._tripDays = getTripDays(this._tripEvents);

    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripDays = undefined;
        this._tripEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._tripDays = undefined;
        this._tripEvents.sort(sortPrice);
        break;
      default:
        this._tripDays = getTripDays(this._tripEvents);
        this._tripEvents = this._sourcedTripEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent, this.dayNode, this._tripOffers, this._tripDestinations);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventsList();
    this._renderEvents();
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });

    this._eventPresenter = {};
    this._tripDayNodes = [];
    remove(this._EventsHistoryComponent);
  }

  _createEventNode(event, dayNode) {
    const eventPresenter = new EventPresenter(this._EventsHistoryComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event, dayNode, this._tripOffers, this._tripDestinations);

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

      this.dayNode = dayNode;

      const filteredEventsByDay = dayNode.dataset.day ?
        filterEventsByDays(this._tripEvents, dayNode.dataset.day) :
        this._tripEvents;

      filteredEventsByDay.forEach((event) => {
        this._createEventNode(event, this.dayNode);
      });
    });

    return eventsListNode;
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTER_BEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvents() {
    render(this._tripContainer, this._createEventsListNode(), RenderPosition.BEFORE_END);
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.AFTER_END);
  }

  _renderTrip() {
    if (this._tripEvents.length) {
      this._renderSort();
      this._renderEvents();
    } else {
      this._renderNoEvents();
    }
  }
}
