import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format(`L`);
};

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

export const formatMonthDate = (date) => {
  return moment(date).format(`MMM DD`);
};

export const formatUrl = (url) => {
  const [protocol, host] = url.split(`:`);

  return `${protocol}s:${host}`;
};
