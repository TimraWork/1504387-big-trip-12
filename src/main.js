import {EVENT_COUNT} from './const.js';
import {render} from './utils.js';
import {generateEvent} from './mock/event.js';

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b)=> {
  // console.log(`a.dateRange[0].getTime() = `, a.dateRange[0].getDate(), a.dateRange[0].toLocaleString(`en-US`, {month: `long`}));
  // console.log(`b.dateRange[0].getTime() = `, b.dateRange[0].getTime());
  return b.dateRange[0].getTime() - a.dateRange[0].getTime();
}).reverse();
console.log(`events ==== `, events);

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

render(header, createInfoTemplate(), `afterbegin`);
render(titleMenu, createMenuTemplate(), `afterend`);
render(titleFilter, createFilterTemplate(), `afterend`);
render(event, createSortTemplate(), `beforeend`);

render(event, createEventFormTemplate(events[0]), `beforeend`);
render(event, createEventDayTemplate(), `beforeend`);

const eventsList = event.querySelector(`.trip-events__list`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(eventsList, createEventTemplate(events[i]), `beforeend`);
}
