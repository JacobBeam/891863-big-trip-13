import EventEditView from "../view/event-edit.js";
import EventItemView from "../view/event-item.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Event {
  constructor(eventsListComponent) {
    this._eventsListComponent = eventsListComponent

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handlerEditClick = this._handlerEditClick.bind(this);
    this._handlerFormSubmit = this._handlerFormSubmit.bind(this);
    this._handlerEditCloseClick = this._handlerEditCloseClick.bind(this);
    this._handlerEscKeyDown = this._handlerEscKeyDown.bind(this);
  }

  init(trip) {
    this._trip = trip;

    this._eventComponent = new EventItemView(trip);
    this._eventEditComponent = new EventEditView(trip);

    this._eventComponent.setEditClickHandler(this._handlerEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handlerFormSubmit);
    this._eventEditComponent.setEditCloseClickHandler(this._handlerEditCloseClick)

    render(this._eventsListComponent, this._eventComponent, RenderPosition.BEFOREEND);
  }



  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._handlerEscKeyDown);
  };

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._handlerEscKeyDown);
  };

  _handlerEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  };

  _handlerEditClick() {
    this._replaceCardToForm();
  }

  _handlerFormSubmit() {
    this._replaceFormToCard();
  }

  _handlerEditCloseClick() {
    this._replaceFormToCard();
  }

}
