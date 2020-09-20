import EventEditView from "../view/event-edit.js";
import {remove, render} from "../utils/render.js";
import {generateId} from "../utils/common.js";
import {UserAction, UpdateType, RenderPosition, KeyCode} from "../const.js";

export default class EventNew {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(offers, destinations) {
    if (this._eventEditComponent !== null) {
      return;
    }

    const isNewEvent = true;
    this._eventEditComponent = new EventEditView(offers, destinations, this._event, isNewEvent);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListContainer, this._eventEditComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    const newId = generateId();
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        Object.assign({id: newId}, event)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESCAPE) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
