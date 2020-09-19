export const EVENT_COUNT = 20;
export const MAX_OFFERS = 3;
export const MAX_INFO_CITIES = 3;
export const TEXT_DIVIDER = ` &mdash; `;
export const EVENT_TYPE = {
  transfers: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activities: [`check-in`, `sightseeing`, `restaurant`],
  joinLabels: [`to`, `in`]
};
export const OFFERS_DATA = [
  {name: `seats`, label: `Choose seats`, types: [`flight`, `train`]},
  {name: `meal`, label: `Add meal`, types: [`flight`, `train`, `ship`]},
  {name: `uber`, label: `Order Uber`, types: [`taxi`]},
  {name: `luggage`, label: `Add luggage`, types: [`flight`, `train`, `ship`, `bus`, `transport`, `taxi`]},
  {name: `lunch`, label: `Lunch in city`, types: [`sightseeing`, `check-in`]},
  {name: `train`, label: `Travel by train`, types: [`check-in`]},
  {name: `tickets`, label: `Book tickets`, types: [`sightseeing`, `bus`]},
  {name: `breakfast`, label: `Add breakfast`, types: [`sightseeing`, `check-in`]},
  {name: `comfort`, label: `Switch to comfort`, types: [`flight`, `train`, `ship`, `taxi`]},
  {name: `rent`, label: `Rent a car`, types: [`drive`]},
];
export const RenderPosition = {
  AFTER_END: `afterend`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};
export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`
};
export const KeyCode = {
  ESCAPE: 27
};
export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};
export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};
export const FilterType = {
  ALL: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};
