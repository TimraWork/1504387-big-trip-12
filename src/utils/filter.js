import {FilterType} from "../const";
import moment from "moment";

const getCurrentDate = () => {
  const currentDate = new Date();

  return new Date(currentDate);
};

const isEventPlanned = (startDate) => {
  if (startDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  return moment(startDate).isAfter(currentDate);
};

const isEventFinished = (endDate) => {
  if (endDate === null) {
    return false;
  }
  const currentDate = getCurrentDate();

  return moment(endDate).isBefore(currentDate);
};

export const filter = {
  [FilterType.ALL]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventPlanned(event.dateRange[0])),
  [FilterType.PAST]: (events) => events.filter((event) => isEventFinished(event.dateRange[1])),
};
