import EventEditView from "../view/event-edit.js";
import EventItemView from "../view/event-item.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Event {
  constructor(eventsListComponent, changeData) {
    this._eventsListComponent = eventsListComponent;
    this._changeData = changeData;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handlerEditClick = this._handlerEditClick.bind(this);
    this._handlerFormSubmit = this._handlerFormSubmit.bind(this);
    this._handlerEditCloseClick = this._handlerEditCloseClick.bind(this);
    this._handlerEscKeyDown = this._handlerEscKeyDown.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;


    this._eventComponent = new EventItemView(trip);
    this._eventEditComponent = new EventEditView(trip);

    this._eventComponent.setEditClickHandler(this._handlerEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handlerFormSubmit);
    this._eventEditComponent.setEditCloseClickHandler(this._handlerEditCloseClick)
    this._eventComponent.setFavoriteClickHandler(this._handlerFavoriteClick)


    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListComponent, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventsListComponent.getElement().contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventsListComponent.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
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

  _handlerFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._trip,
        {
          isFavorite: !this._trip.isFavorite
        }
      )
    );
  }

}
