import EventEditView from "../view/event-edit.js";
import EventNewButtonView from "../view/event-new-button.js";

import {remove, render} from "../utils/render.js";
import {UserAction, UpdateType, RenderPosition, KeyCode} from "../const.js";

export default class EventNew {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;
    this._eventNewButtonComponent = new EventNewButtonView();

    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(offers, destinations, callback) {
    this._destroyCallback = callback;

    if (this._eventEditComponent !== null) {
      return;
    }

    const isNewEvent = true;
    this._eventEditComponent = new EventEditView(offers, destinations, this._event, isNewEvent);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListContainer, this._eventEditComponent, RenderPosition.AFTER_BEGIN);

    this._eventNewButtonComponent.setDisabled();

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    this._eventNewButtonComponent.setEnabled();

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._eventEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        event
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
