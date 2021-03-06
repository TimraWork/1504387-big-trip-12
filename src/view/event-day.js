import {formatMonthDate} from '../utils/common.js';
import AbstractView from './abstract.js';

const createEventDayTemplate = (day, index) => {
  if (day !== undefined) {
    const formattedDate = formatMonthDate(new Date(day));

    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index}</span>
                <time class="day__date" datetime="${day}">${formattedDate}</time>
              </div>
              <ul class="trip-events__list" data-day=${day}></ul>
            </li>`;
  }

  return `<li class="trip-days__item  day">
            <div class="day__info"></div>
            <ul class="trip-events__list">
            </ul>
          </li>`;
};

export default class EventDay extends AbstractView {
  constructor(day, index) {
    super();

    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createEventDayTemplate(this._day, this._index);
  }

  getDayContainer() {
    return this.getElement().querySelector(`.trip-events__list`);
  }
}
