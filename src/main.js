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

import Api from "./api.js";

const AUTHORIZATION = `Basic rTf9595iy29889a`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const api = new Api(END_POINT, AUTHORIZATION);

const infoContainer = document.querySelector(`.trip-main`);
const eventsContainer = document.querySelector(`.trip-events`);
const titleMenu = infoContainer.querySelector(`h2:nth-of-type(1)`);
const titleFilter = infoContainer.querySelector(`h2:nth-of-type(2)`);

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(eventsContainer, eventsModel, offersModel, destinationsModel, filterModel, api);
const statisticsPresenter = new StatisticsPresenter(eventsContainer, eventsModel);
const infoPresenter = new InfoPresenter(infoContainer, eventsModel, offersModel);
const menuPresenter = new MenuPresenter(infoContainer, titleMenu, tripPresenter, statisticsPresenter);
const filterPresenter = new FilterPresenter(titleFilter, filterModel, eventsModel);

tripPresenter.init();
infoPresenter.init();
filterPresenter.init();
menuPresenter.init();

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.INIT, []);
  });

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.INIT, offers);
  })
  .then(() => {
    api.getEvents()
      .then((events) => {
        eventsModel.setEvents(UpdateType.INIT, events);
      })
      .catch(() => {
        eventsModel.setEvents(UpdateType.INIT, []);
      });
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.INIT, []);
  });
