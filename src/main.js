import {EVENT_COUNT, RenderPosition, KeyCode} from './const.js';

import {getTripDays, filterEventsByDays} from './utils/event.js';
import {render, replace} from './utils/render.js';

import {generateEvent} from './mock/event.js';
import TripPresenter from "./presenter/trip.js";

import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
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
    replace(eventContainer, eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventContainer, eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESCAPE) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormResetHandler(() => {
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
  render(eventsContainer, createEventsList(), RenderPosition.BEFORE_END);
}

const tripPresenter = new TripPresenter(eventsContainer);
tripPresenter.init(events);
