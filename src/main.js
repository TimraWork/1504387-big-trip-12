import {EVENT_COUNT, RenderPosition} from './const.js';
import {render, renderElement} from './utils.js';
import {generateEvent} from './mock/event.js';

import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/filter.js";

import {createInfoTemplate} from './view/info.js';
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
// render(titleMenu, createMenuTemplate(), `afterend`);
renderElement(titleMenu, new MenuView().getElement(), RenderPosition.AFTER_END);
// render(titleFilter, createFilterTemplate(), `afterend`);
renderElement(titleFilter, new FilterView().getElement(), RenderPosition.AFTER_END);
// render(eventContainer, createSortTemplate(), `beforeend`);
renderElement(titleFilter, new SortView().getElement(), RenderPosition.BEFORE_END);

render(eventContainer, createEventFormTemplate(events[0]), `beforeend`);
render(eventContainer, createEventsHistoryTemplate(events), `beforeend`);
