import AbstractView from './abstract.js';

const createEventsCreateTemplate = () => {
  return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
};

export default class NoEvents extends AbstractView {
  getTemplate() {
    return createEventsCreateTemplate();
  }
}
