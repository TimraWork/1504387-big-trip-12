import {createInfoTemplate} from './view/info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createEventFormTemplate} from './view/event-form.js';
import {createEventDayTemplate} from './view/event-day.js';
import {createEventTemplate} from './view/event.js';
const EVENTS_COUNT = 3;

const header = document.querySelector(`.trip-main`);
const events = document.querySelector(`.trip-events`);
const titleMenu = header.querySelector(`h2:nth-of-type(1)`);
const titleFilter = header.querySelector(`h2:nth-of-type(2)`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(header, createInfoTemplate(), `afterbegin`);
render(titleMenu, createMenuTemplate(), `afterend`);
render(titleFilter, createFilterTemplate(), `afterend`);
render(events, createSortTemplate(), `beforeend`);
render(events, createEventFormTemplate(), `beforeend`);
render(events, createEventDayTemplate(), `beforeend`);

const eventsList = events.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsList, createEventTemplate(), `beforeend`);
}
