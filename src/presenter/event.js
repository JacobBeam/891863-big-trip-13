import EventEditView from "../view/event-edit.js";
import EventItemView from "../view/event-item.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/utils.js";
import {isOnline} from "../utils/utils.js";
import {toast} from "../utils/toast/toast.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
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

  init(trip, allDestinations, allOffers) {
    this._trip = trip;
    this._dstinations = allDestinations;
    this._offers = allOffers;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;


    this._eventComponent = new EventItemView(trip);
    this._eventEditComponent = new EventEditView(trip, allDestinations, allOffers);

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
      replace(this._eventComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
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

  setViewState(state) {

    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
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
    if (!isOnline()) {
      this._eventComponent.shake();
      toast(`You can't edit point offline`);
      return;
    }

    this._replaceCardToForm();
  }

  _handlerFormSubmit(trip) {
    if (!isOnline()) {
      this._eventEditComponent.shake();
      toast(`You can't save point offline`);
      return;
    }

    this._changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, trip);
  }

  _handlerDeleteClick(trip) {
    if (!isOnline()) {
      this._eventEditComponent.shake();
      toast(`You can't delete point offline`);
      return;
    }

    this._changeData(UserAction.DELETE_POINT, UpdateType.MINOR, trip);
  }

  _handlerEditCloseClick() {
    this._eventEditComponent.reset(this._trip);
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
