import {EVENT_COUNT} from './const.js';
import {render} from './utils.js';
import {generateEvent} from './mock/event.js';

import {createInfoTemplate} from './view/info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createEventFormTemplate} from './view/event-form.js';
import {createEventsHistoryTemplate} from './view/events-history.js';

const infoContainer = document.querySelector(`.trip-main`);
const eventContainer = document.querySelector(`.trip-events`);
const titleMenu = infoContainer.querySelector(`h2:nth-of-type(1)`);
const titleFilter = infoContainer.querySelector(`h2:nth-of-type(2)`);

const events = new Array(EVENT_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b)=> {
    return a.dateRange[0].getTime() - b.dateRange[0].getTime();
  });

render(infoContainer, createInfoTemplate(events), `afterbegin`);
render(titleMenu, createMenuTemplate(), `afterend`);
render(titleFilter, createFilterTemplate(), `afterend`);
render(eventContainer, createSortTemplate(), `beforeend`);
render(eventContainer, createEventFormTemplate(events[0]), `beforeend`);
render(eventContainer, createEventsHistoryTemplate(events), `beforeend`);
