import AbstractView from "./abstract.js";

const createEventNewButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class EventNewButton extends AbstractView {
  getTemplate() {
    return createEventNewButtonTemplate();
  }
}
