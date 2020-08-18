import {EVENT_COUNT, RenderPosition} from './const.js';
import {render} from './utils.js';
import {generateEvent} from './mock/event.js';

import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/filter.js";
import InfoView from "./view/info.js";
import EventForm from "./view/event-form.js";
import EventsHistory from "./view/events-history.js";

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

render(infoContainer, new InfoView(events).getElement(), RenderPosition.AFTER_BEGIN);
render(titleMenu, new MenuView().getElement(), RenderPosition.AFTER_END);
render(titleFilter, new FilterView().getElement(), RenderPosition.AFTER_END);
render(titleFilter, new SortView().getElement(), RenderPosition.BEFORE_END);
render(eventContainer, new EventForm(events[0]).getElement(), RenderPosition.BEFORE_END);
render(eventContainer, new EventsHistory(events).getElement(), RenderPosition.BEFORE_END);
