import EventNewView from "../view/event-new.js";
import EventFormView from "../view/event-form.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/utils.js";
import {isOnline} from "../utils/utils.js";
import {BLANK_EVENT} from "../utils/const.js";
import {toast} from "../utils/toast/toast.js";

const KEYDOWN_EVENT = `keydown`;
const TOAST_ERROR_SAVE = `You can't save point offline`;
const KEY_ESCAPE = `Escape`;
const KEY_ESC = `Esc`;

export default class EventNew {

  constructor(eventsListContainer, changeData) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._eventNewComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
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


  _handleFormSubmit(trip) {

    if (!isOnline()) {
      this._eventNewComponent.shake();
      toast(TOAST_ERROR_SAVE);
      return;
    }

    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        trip
    );
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === KEY_ESCAPE || evt.key === KEY_ESC) {
      evt.preventDefault();
      this.destroy();
    }
  }

  init(callback, allDestinations, allOffers) {
    this._destroyCallback = callback;

    if (this._eventNewComponent !== null) {
      return;
    }

    const isAdded = true;

    //this._eventNewComponent = new EventNewView(allDestinations, allOffers, isAdded);
    this._eventNewComponent = new EventFormView(BLANK_EVENT,allDestinations, allOffers, isAdded);
  //this._eventNewComponent.setDeletelClickHandler(this._handleCancelClick);
    this._eventNewComponent.setCancelClickHandler(this._handleCancelClick);
    this._eventNewComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._eventsListContainer, this._eventNewComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(KEYDOWN_EVENT, this._escKeyDownHandler);

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

    document.removeEventListener(KEYDOWN_EVENT, this._escKeyDownHandler);
  }
}
