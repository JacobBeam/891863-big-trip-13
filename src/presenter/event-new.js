import EventNewView from "../view/event-new.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/utils.js";
import {isOnline} from "../utils/utils.js";
import {toast} from "../utils/toast/toast.js";

export default class EventNew {

  constructor(eventsListContainer, changeData) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._eventNewComponent = null;
    this._destroyCallback = null;

    this._handlerFormSubmit = this._handlerFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlerCancelClick = this._handlerCancelClick.bind(this);
  }

  init(callback, allDestinations, allOffers) {
    this._destroyCallback = callback;

    if (this._eventNewComponent !== null) {
      return;
    }

    this._eventNewComponent = new EventNewView(allDestinations, allOffers);
    this._eventNewComponent.setCancelClickHandler(this._handlerCancelClick);
    this._eventNewComponent.setFormSubmitHandler(this._handlerFormSubmit);

    render(this._eventsListContainer, this._eventNewComponent, RenderPosition.AFTERBEGIN);


    document.addEventListener(`keydown`, this._escKeyDownHandler);

  }

  destroy() {
    if (this._eventNewComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._eventNewComponent);
    this._eventNewComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._eventNewComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventNewComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._eventNewComponent.shake(resetFormState);
  }

  _handlerFormSubmit(trip) {

    if (!isOnline()) {
      this._eventNewComponent.shake();
      toast(`You can't save point offline`);
      return;
    }

    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        trip
    );
  }

  _handlerCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
