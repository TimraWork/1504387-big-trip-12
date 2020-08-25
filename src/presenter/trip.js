import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import EventsHistoryView from "../view/events-history.js";
import EventDayView from "../view/event-day.js";
// import EventView from "../view/event.js";
// import EventEditView from "../view/event-edit.js";
import {getTripDays, filterEventsByDays} from '../utils/event.js';
import {render, replace} from '../utils/render.js';
import {RenderPosition} from '../const.js';

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
    render(this._tripContainer, this._infoComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  // const createEventsList = function () {
  //   const eventsList = new EventsHistoryView(events).getElement();

  //   getTripDays(events).forEach((day, index) => {

  //     eventsList.appendChild(new EventDayView(day, index + 1).getElement());

  //     const eventContainer = eventsList.querySelector(`.trip-events__list[data-day="${day}"]`);
  //     const filteredEventsByDay = filterEventsByDays(events, day);

  //     filteredEventsByDay.forEach((event) =>{
  //       const eventComponent = new EventView(event);
  //       const eventEditComponent = new EventEditView(event);

  //       eventContainer.appendChild(eventComponent.getElement());

  //       addEventActions(eventContainer, eventComponent, eventEditComponent);
  //     });
  //   });

  //   return eventsList;
  // };

  _createEventDaysNode() {
    const tripDaysNode = this._EventsHistoryComponent.getElement();
    console.log(`getTripDays(this._tripEvents) = `, getTripDays(this._tripEvents));
    getTripDays(this._tripEvents)
      .forEach((day, index) => {
        tripDaysNode.appendChild(new EventDayView(day, index + 1).getElement());
      });
    return tripDaysNode;
  }

  _renderEvents() {
    console.log(this._createEventDaysNode());
    // render(this._tripContainer, createEventsList(), RenderPosition.BEFORE_END);
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
