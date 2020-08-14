import {EVENT_COUNT} from './const.js';
import {render, formatDate} from './utils.js';
import {generateEvent} from './mock/event.js';

import {createInfoTemplate} from './view/info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createEventFormTemplate} from './view/event-form.js';
import {createEventDayTemplate} from './view/event-day.js';
import {createEventTemplate} from './view/event.js';

const header = document.querySelector(`.trip-main`);
const event = document.querySelector(`.trip-events`);
const titleMenu = header.querySelector(`h2:nth-of-type(1)`);
const titleFilter = header.querySelector(`h2:nth-of-type(2)`);

const events = new Array(EVENT_COUNT).fill()
            .map(generateEvent)
            .sort((a, b)=> {
              return a.dateRange[0].getTime() - b.dateRange[0].getTime();
            });

render(header, createInfoTemplate(events), `afterbegin`);
render(titleMenu, createMenuTemplate(), `afterend`);
render(titleFilter, createFilterTemplate(), `afterend`);
render(event, createSortTemplate(), `beforeend`);

render(event, createEventFormTemplate(events[0]), `beforeend`);

const renderEventsDays = () => {
  const days = new Set(events.slice(0, -1).map((day) => {
    return formatDate(day.dateRange[0]);
  }));

  let index = 1;

  for (const day of days.keys()) {
    render(event, createEventDayTemplate(index++, day), `beforeend`);
  }
};

const renderEvents = () => {

  for (let i = 1; i < EVENT_COUNT; i++) {
    const eventDay = formatDate(events[i].dateRange[0]);
    const eventsList = event.querySelector(`.trip-events__list[data-day="${eventDay}"]`);

    render(eventsList, createEventTemplate(events[i]), `beforeend`);
  }
};

if (events.length) {
  renderEventsDays();
  renderEvents();
}
