import {EVENT_TYPE} from "../const";
import moment from "moment";

const EVENT_TYPES = [
  ...EVENT_TYPE.transfers,
  ...EVENT_TYPE.activities
];

const TRANSFERS = EVENT_TYPE.transfers.map((event) => event.name);

const getEventsUniqueTypes = (events) => {
  return [...new Set(events.map((event) => event.type))];
};

const getEventsUniqueTransports = (events) => {
  return getEventsUniqueTypes(events).filter((event) => TRANSFERS.includes(event));
};

export const getEventsTypesCount = (events) => {
  return getEventsUniqueTypes(events).length;
};

export const getEventsTransportsCounts = (events) => {
  return getEventsUniqueTransports(events)
          .map((transport) => events
            .filter((event) => event.type === transport)
              .length
          );
};

export const getEventsTypesPrices = (events) => {
  const prices = getEventsUniqueTypes(events)
    .map((type) => {
      const filteredEventsByType = events.filter((event) => event.type === type);
      return filteredEventsByType.reduce((acc, curr) => (acc + curr.price), 0);
    });

  return prices;
};

export const getEventsTypesLabels = (events) => {
  const labels = getEventsUniqueTypes(events)
    .map((type) => EVENT_TYPES
      .find((label)=>label.name === type)
        .label);

  return labels;
};

export const getTransportsLabels = (events) => {
  const transportLabels = getEventsUniqueTransports(events)
    .map((type) => EVENT_TYPE.transfers
      .find((label) => label.name === type)
        .label);

  return transportLabels;
};

export const getTransportsCount = (events) => {
  return getTransportsLabels(events).length;
};

const getTimeInterval = (event) => {
  const [d1, d2] = event.dateRange;
  return moment(d2).diff(moment(d1));
};

export const getEventsTypesTimes = (events) => {
  const times = getEventsUniqueTypes(events)
    .map((type) => {
      const filteredEventsByType = events.filter((event) => event.type === type);
      const interval = filteredEventsByType
        .reduce((acc, curr) => {
          return acc + getTimeInterval(curr);
        }, 0);

      return Math.trunc(moment.duration(interval).asHours());
    });

  return times;
};

