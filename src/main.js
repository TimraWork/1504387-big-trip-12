import {EVENT_COUNT} from './const.js';
import {generateEvent} from './mock/event.js';
import {generateOffers} from './mock/offers.js';
import {generateDestinations} from './mock/destinations.js';

import TripPresenter from "./presenter/trip.js";
import MenuPresenter from "./presenter/menu.js";
import FilterPresenter from "./presenter/filter.js";
import InfoPresenter from './presenter/info.js';
import StatisticsPresenter from './presenter/statistics.js';

import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";

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

const tripPresenter = new TripPresenter(eventsContainer, eventsModel, offersModel, destinationsModel, filterModel);

const statisticsPresenter = new StatisticsPresenter(eventsContainer, eventsModel);

const filterPresenter = new FilterPresenter(titleFilter, filterModel, eventsModel);
const infoPresenter = new InfoPresenter(infoContainer, eventsModel, offersModel);
const menuPresenter = new MenuPresenter(infoContainer, titleMenu, tripPresenter, statisticsPresenter);

// tripPresenter.init();
statisticsPresenter.init();
filterPresenter.init();
infoPresenter.init();
menuPresenter.init();
