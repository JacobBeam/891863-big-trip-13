import EventEditView from "../view/event-edit.js";
import EventItemView from "../view/event-item.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/utils.js";


const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};
export default class Event {
  constructor(eventsListComponent, changeData, changeMode) {
    this._eventsListComponent = eventsListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlerEditClick = this._handlerEditClick.bind(this);
    this._handlerFormSubmit = this._handlerFormSubmit.bind(this);
    this._handlerEditCloseClick = this._handlerEditCloseClick.bind(this);
    this._handlerEscKeyDown = this._handlerEscKeyDown.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
    this._handlerDeleteClick = this._handlerDeleteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;


    this._eventComponent = new EventItemView(trip);
    this._eventEditComponent = new EventEditView(trip);

    this._eventComponent.setEditClickHandler(this._handlerEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handlerFormSubmit);
    this._eventEditComponent.setEditCloseClickHandler(this._handlerEditCloseClick);
    this._eventComponent.setFavoriteClickHandler(this._handlerFavoriteClick);
    this._eventEditComponent.setDeleteClickHandler(this._handlerDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListComponent, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._handlerEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._handlerEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _handlerEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._trip);
      this._replaceFormToCard();
    }
  }

  _handlerEditClick() {
    this._replaceCardToForm();
  }

  _handlerFormSubmit(trip) {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, trip);
    this._replaceFormToCard();
  }

  _handlerDeleteClick(trip) {
    this._changeData(UserAction.DELETE_POINT, UpdateType.MINOR, trip);
    this._replaceFormToCard();
  }

  _handlerEditCloseClick() {
    this._replaceFormToCard();
  }

  _handlerFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
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
