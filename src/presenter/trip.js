// import SortView from "../view/sort.js";
// import InfoView from "../view/info.js";
// import NoEventView from "../view/no-event.js";
// import EventsHistoryView from "../view/events-history.js";
// import EventDayView from "../view/event-day.js";
// import EventView from "../view/event.js";
// import EventEditView from "../view/event-edit.js";
// import {render, replace} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    // this._noEventComponent = new NoEventView();
  }

  init(tripEvents) {
    console.log(`tripEvents -> `, tripEvents);
    this._tripEvents = tripEvents.slice();
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderEvents() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoEvents() {
    // Метод для рендеринга заглушки
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля
  }
}
