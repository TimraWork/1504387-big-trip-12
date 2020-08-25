import {EVENT_COUNT, RenderPosition} from './const.js';
import {render} from './utils/render.js';
import {generateEvent} from './mock/event.js';

import TripPresenter from "./presenter/trip.js";

import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import InfoView from "./view/info.js";

const infoContainer = document.querySelector(`.trip-main`);
const eventsContainer = document.querySelector(`.trip-events`);
const titleMenu = infoContainer.querySelector(`h2:nth-of-type(1)`);
const titleFilter = infoContainer.querySelector(`h2:nth-of-type(2)`);

const events = new Array(EVENT_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b)=> {
    return a.dateRange[0].getTime() - b.dateRange[0].getTime();
  });

render(infoContainer, new InfoView(events), RenderPosition.AFTER_BEGIN);
render(titleMenu, new MenuView(), RenderPosition.AFTER_END);
render(titleFilter, new FilterView(), RenderPosition.AFTER_END);

const tripPresenter = new TripPresenter(eventsContainer);
tripPresenter.init(events);
