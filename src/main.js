import {EVENT_COUNT, RenderPosition} from './const.js';
import {render} from './utils/render.js';
import {generateEvent} from './mock/event.js';
import {generateOffers} from './mock/offers.js';
import {generateDestinations} from './mock/destinations.js';

import TripPresenter from "./presenter/trip.js";

import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";

import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import InfoView from "./view/info.js";

const infoContainer = document.querySelector(`.trip-main`);
const eventsContainer = document.querySelector(`.trip-events`);
const titleMenu = infoContainer.querySelector(`h2:nth-of-type(1)`);
const titleFilter = infoContainer.querySelector(`h2:nth-of-type(2)`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const offers = generateOffers();
const destinations = generateDestinations();

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const offersModel = new OffersModel();
offersModel.setOffers(offers);

const filterModel = new FilterModel();

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinations);

render(infoContainer, new InfoView(events, offers), RenderPosition.AFTER_BEGIN);
render(titleMenu, new MenuView(), RenderPosition.AFTER_END);
render(titleFilter, new FilterView(), RenderPosition.AFTER_END);

const tripPresenter = new TripPresenter(eventsContainer, eventsModel, offersModel, destinationsModel);
tripPresenter.init();
