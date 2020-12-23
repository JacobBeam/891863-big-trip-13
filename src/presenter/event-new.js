import EventNewView from "../view/event-new.js";
import {generateId} from "../view/mock.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/utils.js";


export default class EventNew {

  constructor(eventsListContainer, changeData) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._eventNewComponent = null;
    this._destroyCallback = null;

    this._handlerFormSubmit = this._handlerFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlerDeleteClick = this._handlerDeleteClick.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._eventNewComponent !== null) {
      return;
    }

    this._eventNewComponent = new EventNewView();
    this._eventNewComponent.setDeleteClickHandler(this._handlerDeleteClick);
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

  _handlerFormSubmit(trip) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, trip)
    );
    this.destroy();
  }

  _handlerDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
