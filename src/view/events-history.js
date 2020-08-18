import {createElement, getTripDays, filterEventsByDays} from '../utils.js';
import {createEventDayTemplate} from '../view/event-day.js';

const createEventsHistoryTemplate = (events) => {
  const days = getTripDays(events);
  if (days.length) {
    return (
      `<ul class="trip-days">
        ${days
          .map((day, index) => {
            const filteredEventsByDay = filterEventsByDays(events, day);
            return createEventDayTemplate(filteredEventsByDay, day, index + 1);
          })
          .join(``)}
      </ul>`
    );
  }

  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class EventsHistory {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createEventsHistoryTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
