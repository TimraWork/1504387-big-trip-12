import {formatMonthDate} from '../utils.js';

export const createEventDayTemplate = (index, day) => {

  const formattedDate = formatMonthDate(new Date(day));

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index}</span>
          <time class="day__date" datetime="${day}">${formattedDate}</time>
        </div>
        <ul class="trip-events__list" data-day=${day}>
        </ul>
      </li>
    </ul>`
  );
};
