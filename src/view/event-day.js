import {createElement, formatMonthDate} from '../utils.js';

const createEventDayTemplate = (events, day, index) => {
  if (day.length) {
    const formattedDate = formatMonthDate(new Date(day));
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index}</span>
                <time class="day__date" datetime="${day}">${formattedDate}</time>
              </div>
              <ul class="trip-events__list" data-day=${day}>
                ${
  console.log(`events = `, events);
  // events
  // // .map((event) => createEventTemplate(event))
  // .join(``)}
}
              </ul>
            </li>`;
  }

  return ``;
};

export default class EventDay {
  constructor(events, day, index) {
    this._events = events;
    this._day = day;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createEventDayTemplate(this._events, this._day, this._index);
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
