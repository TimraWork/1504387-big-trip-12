import {EVENT_COUNT, RenderPosition, KeyCode} from './const.js';
import {render, getTripDays, filterEventsByDays} from './utils.js';
import {generateEvent} from './mock/event.js';

import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/filter.js";
import InfoView from "./view/info.js";
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

render(infoContainer, new InfoView(events).getElement(), RenderPosition.AFTER_BEGIN);
render(titleMenu, new MenuView().getElement(), RenderPosition.AFTER_END);
render(titleFilter, new FilterView().getElement(), RenderPosition.AFTER_END);
render(titleFilter, new SortView().getElement(), RenderPosition.BEFORE_END);
render(eventsContainer, new EventsHistoryView(events).getElement(), RenderPosition.BEFORE_END);

const renderEvent = (eventContainer, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceCardToForm = () => {
    eventContainer.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
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

  render(eventContainer, eventComponent.getElement(), RenderPosition.BEFORE_END);
};

const renderEventDays = () => {
  const tripDaysContainer = eventsContainer.querySelector(`.trip-days`);

  getTripDays(events).forEach((day, index) => {
    const filteredEventsByDay = filterEventsByDays(events, day);
    render(tripDaysContainer, new EventDayView(day, index + 1).getElement(), RenderPosition.BEFORE_END);

    const eventContainer = eventsContainer.querySelector(`.trip-events__list[data-day="${day}"]`);
    filteredEventsByDay.forEach((event)=>renderEvent(eventContainer, event));
  });
};

renderEventDays();
