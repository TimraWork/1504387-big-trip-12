import {EVENT_COUNT, RenderPosition, KeyCode} from './const.js';

import {getTripDays, filterEventsByDays} from './utils/event.js';
import {render, replace} from './utils/render.js';

import {generateEvent} from './mock/event.js';

import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import InfoView from "./view/info.js";
import NoEventView from "./view/no-event.js";
import EventsHistoryView from "./view/events-history.js";
import EventDayView from "./view/event-day.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";

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

const addEventActions = (eventContainer, eventComponent, eventEditComponent) => {

  const replaceCardToForm = () => {
    eventContainer.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    eventContainer.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESCAPE) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener(`reset`, () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const createEventsList = function () {
  const eventsList = new EventsHistoryView(events).getElement();

  getTripDays(events).forEach((day, index) => {

    eventsList.appendChild(new EventDayView(day, index + 1).getElement());

    const eventContainer = eventsList.querySelector(`.trip-events__list[data-day="${day}"]`);
    const filteredEventsByDay = filterEventsByDays(events, day);

    filteredEventsByDay.forEach((event) =>{
      const eventComponent = new EventView(event);
      const eventEditComponent = new EventEditView(event);

      eventContainer.appendChild(eventComponent.getElement());

      addEventActions(eventContainer, eventComponent, eventEditComponent);
    });
  });

  return eventsList;
};

if (events.length) {
  render(eventsContainer, new SortView(), RenderPosition.AFTER_BEGIN);
  render(eventsContainer, createEventsList(), RenderPosition.BEFORE_END);
} else {
  render(eventsContainer, new NoEventView(), RenderPosition.AFTER_END);
}
