export const MAX_OFFERS = 3;
export const MAX_INFO_CITIES = 3;
export const TEXT_DIVIDER = ` &mdash; `;
export const EventType = {
  TRANSFERS: [
    {NAME: `taxi`, LABEL: `🚕  TAXI`},
    {NAME: `bus`, LABEL: `🚌  BUS`},
    {NAME: `train`, LABEL: `🚂  TRAIN`},
    {NAME: `ship`, LABEL: `🛳  SHIP`},
    {NAME: `transport`, LABEL: `🚊 TRANSPORT`},
    {NAME: `drive`, LABEL: `🚗  DRIVE`},
    {NAME: `flight`, LABEL: `✈️ FLIGHT`}],
  ACTIVITIES: [
    {NAME: `check-in`, LABEL: `🏨  CHECK-IN`},
    {NAME: `sightseeing`, LABEL: `🏛  SIGHTSEEING`},
    {NAME: `restaurant`, LABEL: `🍴  RESTAURANT`}],
  JOIN_LABELS: [`to`, `in`]
};
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
  MAJOR: `MAJOR`,
  INIT: `INIT`
};
export const FilterType = {
  ALL: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};
export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};
