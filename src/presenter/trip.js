import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import EventsHistoryView from "../view/events-history.js";
import EventDayView from "../view/event-day.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";

import {getTripDays, filterEventsByDays} from '../utils/event.js';
import {render, replace} from '../utils/render.js';
import {RenderPosition, KeyCode} from '../const.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
    this._EventsHistoryComponent = new EventsHistoryView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTER_BEGIN);
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
