import {getEventsDay} from '../utils.js';
import {createEventDayTemplate} from '../view/event-day.js';

export const createEventsHistoryTemplate = (events) => {
  const days = getEventsDay(events);
  if (days.length) {
    return (
      `<ul class="trip-days">
        ${days
          .map((day, index) => createEventDayTemplate(events, day, index + 1))
          .join(``)}
      </ul>`
    );
  }
};
