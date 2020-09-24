import {EVENT_TYPE} from "../const";

const EVENT_TYPES = [
  ...EVENT_TYPE.transfers,
  ...EVENT_TYPE.activities
];

const TRANSFERS = EVENT_TYPE.transfers.map((event) => event.name);

const getEventsUniqueTypes = (events) => {
  return [...new Set(events.map((event) => event.type))];
};

export const getEventsTypesCount = (events) => {
  return getEventsUniqueTypes(events).length;
};

export const getEventsTypesLabels = (events) => {
  const labels = getEventsUniqueTypes(events)
    .map((type) => EVENT_TYPES
      .find((label)=>label.name === type)
        .label);

  return labels;
};

export const getTransportsLabels = (events) => {
  const transports = getEventsUniqueTypes(events).filter((event) => TRANSFERS.includes(event));
  const transportLabels = transports
    .map((type) => EVENT_TYPE.transfers
      .find((label) => label.name === type).label);

  return transportLabels;
};

export const getTransportsCount = (events) => {
  return getTransportsLabels(events).length;
};

export const getEventsTypesPrices = (events) => {
  const prices = [...new Set(events.map((event) => event.price))];

  return prices;
};

// export const getEventsTypesPrices = (events) => {
//   console.log(events.map((event) => event.type), `\n`, getEventsUniqueTypes(events));

//   return [1, 2, 3, 5];
// };

export const getEventsTypesTimes = (events) => {
  return events;
};

