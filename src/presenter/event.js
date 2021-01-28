import EventFormView from "../view/event-form.js";
import EventItemView from "../view/event-item.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/utils.js";
import {isOnline} from "../utils/utils.js";
import {toast} from "../utils/toast/toast.js";

const KEYDOWN_EVENT = `keydown`;
const TOAST_ERROR_SAVE = `You can't save point offline`;
const TOAST_ERROR_DELETE = `You can't delete point offline`;
const TOAST_ERROR_EDIT = `You can't edit point offline`;
const KEY_ESCAPE = `Escape`;
const KEY_ESC = `Esc`;

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

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleEditCloseClick = this._handleEditCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
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

  init(trip, allDestinations, allOffers) {
    this._trip = trip;
    this._dstinations = allDestinations;
    this._offers = allOffers;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    const isAdded = false;

    this._eventComponent = new EventItemView(this._trip);
    this._eventEditComponent = new EventFormView(this._trip, this._dstinations, this._offers, isAdded);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setEditCloseClickHandler(this._handleEditCloseClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

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

  _handleEscKeyDown(evt) {
    if (evt.key === KEY_ESCAPE || evt.key === KEY_ESC) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._trip);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    if (!isOnline()) {
      this._eventComponent.shake();
      toast(TOAST_ERROR_EDIT);
      return;
    }

    this._replaceCardToForm();
  }

  _handleFormSubmit(trip) {
    if (!isOnline()) {
      this._eventEditComponent.shake();
      toast(TOAST_ERROR_SAVE);
      return;
    }

    this._changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, trip);
  }

  _handleDeleteClick(trip) {
    if (!isOnline()) {
      this._eventEditComponent.shake();
      toast(TOAST_ERROR_DELETE);
      return;
    }

    this._changeData(UserAction.DELETE_POINT, UpdateType.MINOR, trip);
  }

  _handleEditCloseClick() {
    this._eventEditComponent.reset(this._trip);
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
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

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(KEYDOWN_EVENT, this._handleEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
    this._eventEditComponent.setDatepickers();
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(KEYDOWN_EVENT, this._handleEscKeyDown);
    this._mode = Mode.DEFAULT;
    this._eventEditComponent.removeDatepickers();
  }

}
