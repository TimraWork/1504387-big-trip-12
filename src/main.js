import {EVENT_COUNT, RenderPosition} from './const.js';
import {render} from './utils/render.js';
import {generateEvent} from './mock/event.js';
import {generateOffers} from './mock/offers.js';
import {generateDestinations} from './mock/destinations.js';

import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";

import MenuView from "./view/menu.js";
import InfoView from "./view/info.js";
import EventNewButtonView from "./view/event-new-button.js";

const infoContainer = document.querySelector(`.trip-main`);
const eventsContainer = document.querySelector(`.trip-events`);
const titleMenu = infoContainer.querySelector(`h2:nth-of-type(1)`);
const titleFilter = infoContainer.querySelector(`h2:nth-of-type(2)`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const offers = generateOffers();
const destinations = generateDestinations();

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

eventsModel.setEvents(events);
offersModel.setOffers(offers);
destinationsModel.setDestinations(destinations);

const newEventButtonComponent = new EventNewButtonView();

render(infoContainer, new InfoView(events, offers), RenderPosition.AFTER_BEGIN);
render(infoContainer, newEventButtonComponent, RenderPosition.BEFORE_END);
render(titleMenu, new MenuView(), RenderPosition.AFTER_END);

const tripPresenter = new TripPresenter(eventsContainer, eventsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(titleFilter, filterModel, eventsModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
