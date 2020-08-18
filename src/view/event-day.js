import {formatMonthDate} from '../utils.js';
import {createEventTemplate} from '../view/event.js';

export const createEventDayTemplate = (events, day, index) => {
  if (day.length) {
    const formattedDate = formatMonthDate(new Date(day));
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index}</span>
                <time class="day__date" datetime="${day}">${formattedDate}</time>
              </div>
              <ul class="trip-events__list" data-day=${day}>
                ${events
                  .map((event) => createEventTemplate(event))
                  .join(``)}
              </ul>
            </li>`;
  }

  return ``;
};
