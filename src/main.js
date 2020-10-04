import {UpdateType} from './const.js';

import TripPresenter from "./presenter/trip.js";
import MenuPresenter from "./presenter/menu.js";
import FilterPresenter from "./presenter/filter.js";
import InfoPresenter from './presenter/info.js';
import StatisticsPresenter from './presenter/statistics.js';

import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";

import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic rTf0RS5Ty298F9a`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const infoContainer = document.querySelector(`.trip-main`);
const eventsContainer = document.querySelector(`.trip-events`);
const titleMenu = infoContainer.querySelector(`h2:nth-of-type(1)`);
const titleFilter = infoContainer.querySelector(`h2:nth-of-type(2)`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(eventsContainer, eventsModel, offersModel, destinationsModel, filterModel, apiWithProvider);
const statisticsPresenter = new StatisticsPresenter(eventsContainer, eventsModel);
const infoPresenter = new InfoPresenter(infoContainer, eventsModel, offersModel);
const menuPresenter = new MenuPresenter(infoContainer, titleMenu, tripPresenter, statisticsPresenter);
const filterPresenter = new FilterPresenter(titleFilter, filterModel, eventsModel);

tripPresenter.init();
infoPresenter.init();
filterPresenter.init();
menuPresenter.init();

Promise.all([
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers(),
  apiWithProvider.getEvents()
])
.then(([offers, destinations, events]) => {
  offersModel.setOffers(UpdateType.INIT, offers);
  destinationsModel.setDestinations(UpdateType.INIT, destinations);
  eventsModel.setEvents(UpdateType.INIT, events);
})
.catch(() => {
  offersModel.setOffers(UpdateType.INIT, []);
  destinationsModel.setDestinations(UpdateType.INIT, []);
  eventsModel.setEvents(UpdateType.INIT, []);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
