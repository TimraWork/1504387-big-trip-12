import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import {replace, remove} from '../utils/render.js';
import {KeyCode} from '../const.js';

export default class Event {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleResetClick = this._handleResetClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event, dayNode) {
    this._event = event;
    this._dayNode = dayNode;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(this._event);
    this._eventEditComponent = new EventEditView(this._event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormResetHandler(this._handleResetClick);


    if (prevEventComponent === null || prevEventEditComponent === null) {
      this._eventNode = this._dayNode.appendChild(this._eventComponent.getElement());
      // console.log(`prevEventComponent = `, this._eventNode);
      return this._eventNode;
    }

    if (this._eventListContainer.getElement().contains(prevEventComponent.getElement())) {
      replace(this._dayNode, this._eventComponent, prevEventComponent);
    }

    if (this._eventListContainer.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._dayNode, this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);

    return this._eventNode;
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._dayNode, this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._dayNode, this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESCAPE) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }

  _handleResetClick() {
    this._replaceFormToCard();
  }

}
