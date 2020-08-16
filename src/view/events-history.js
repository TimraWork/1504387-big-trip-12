import {getTripDays, filterEventsByDays} from '../utils.js';
import {createEventDayTemplate} from '../view/event-day.js';

export const createEventsHistoryTemplate = (events) => {
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
  } else {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
};
