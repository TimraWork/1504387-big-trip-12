import {EVENT_COUNT, RenderPosition} from './const.js';
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
render(eventsContainer, new EventEditView(events[0]).getElement(), RenderPosition.BEFORE_END);
render(eventsContainer, new EventsHistoryView(events).getElement(), RenderPosition.BEFORE_END);

const tripDaysContainer = eventsContainer.querySelector(`.trip-days`);
getTripDays(events).forEach((day, index) => {
  const filteredEventsByDay = filterEventsByDays(events, day);
  return render(tripDaysContainer, new EventDayView(filteredEventsByDay, day, index + 1).getElement(), RenderPosition.BEFORE_END);
});

const eventContainers = eventsContainer.querySelectorAll(`.trip-events__list`);
eventContainers.forEach((event) => {
  console.log(event.dataset.day);
});
// console.log(`eventContainer`, eventContainer);
// render(eventContainer, new EventView(task), RenderPosition.BEFOREEND);
// const renderEvent = (taskListElement, task) => {
//   const eventComponent = new EventView(task);
//   const eventEditComponent = new EventEditView(task);

//   const replaceCardToForm = () => {
//     taskListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
//   };

//   const replaceFormToCard = () => {
//     taskListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
//   };

//   eventComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
//     replaceCardToForm();
//   });

//   eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
//     evt.preventDefault();
//     replaceFormToCard();
//   });

//   render(taskListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
// };
