import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import EventsHistoryView from "../view/events-history.js";
import EventDayView from "../view/event-day.js";

import EventPresenter from "./event.js";

import {getTripDays, filterEventsByDays} from '../utils/event.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../const.js';
import {sortTime, sortPrice} from "../utils/event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
    this._EventsHistoryComponent = new EventsHistoryView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();

    this._tripDays = getTripDays(this._tripEvents);

    this._renderTrip();
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

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventsList();
    this._renderEvents();
  }

  _clearEventsList() {
    this._EventsHistoryComponent.getElement().innerHTML = ``;
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTER_BEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _createEventNode(event, dayNode) {
    const eventPresenter = new EventPresenter(this._EventsHistoryComponent);
    eventPresenter.init(event, dayNode);
  }

  _createEventsByDayNode() {
    const eventsNode = this._createDaysNode();

    eventsNode.querySelectorAll(`.trip-events__list`).forEach((dayNode) => {
      const filteredEventsByDay = dayNode.dataset.day ?
        filterEventsByDays(this._tripEvents, dayNode.dataset.day) :
        this._tripEvents;

      filteredEventsByDay.forEach((event) => {
        this._createEventNode(event, dayNode);
      });
    });

    return eventsNode;
  }

  _createDaysNode() {
    const tripDaysNode = this._EventsHistoryComponent.getElement();

    if (this._tripDays) {
      this._tripDays.forEach((day, index) => {
        tripDaysNode.appendChild(new EventDayView(day, index + 1).getElement());
      });
    } else {
      tripDaysNode.appendChild(new EventDayView(this._tripDays).getElement());
    }

    return tripDaysNode;
  }

  _renderEvents() {
    render(this._tripContainer, this._createEventsByDayNode(), RenderPosition.BEFORE_END);
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
