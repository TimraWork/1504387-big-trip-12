import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import EventsHistoryView from "../view/events-history.js";
import EventDayView from "../view/event-day.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";

import {getTripDays, filterEventsByDays} from '../utils/event.js';
import {render, replace} from '../utils/render.js';
import {RenderPosition, KeyCode} from '../const.js';
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

    this._renderTrip();
  }

  _sortEvents(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
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

  _addEventHandlers(eventContainer, eventComponent, eventEditComponent) {
    const replaceCardToForm = () => {
      replace(eventContainer, eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventContainer, eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KeyCode.ESCAPE) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormResetHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  }

  _createEventNode(event, dayNode) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const eventNode = dayNode.appendChild(eventComponent.getElement());

    this._addEventHandlers(dayNode, eventComponent, eventEditComponent);

    return eventNode;
  }

  _createEventsByDayNode() {
    const eventsNode = this._createDaysNode();

    eventsNode.querySelectorAll(`.trip-events__list`).forEach((dayNode) => {
      const filteredEventsByDay = filterEventsByDays(this._tripEvents, dayNode.dataset.day);

      filteredEventsByDay.forEach((event) => {
        this._createEventNode(event, dayNode);
      });
    });

    return eventsNode;
  }

  _createDaysNode() {
    const tripDaysNode = this._EventsHistoryComponent.getElement();

    getTripDays(this._tripEvents).forEach((day, index) => {
      tripDaysNode.appendChild(new EventDayView(day, index + 1).getElement());
    });

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
