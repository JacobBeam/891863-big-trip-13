import SortView from "../view/trip-sort.js";
import EventsListView from "../view/trip-list.js";
import EventEditView from "../view/event-edit.js";
import EventItemView from "../view/event-item.js";
import EventPresenter from "./event.js";
import {render, RenderPosition, replace} from "../utils/render.js";


export default class Board {

  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();
  }

  init(boardTrips) {
    this._boardTrips = boardTrips.slice();

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._boardContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip(trip) {
    //const eventComponent = new EventItemView(trip);
    //const eventEditComponent = new EventEditView(trip);

    //const replaceCardToForm = () => {
    //  replace(eventEditComponent, eventComponent);
    //};

    //const replaceFormToCard = () => {
    //  replace(eventComponent, eventEditComponent);
    //};

    //const onEscKeyDown = (evt) => {
    //  if (evt.key === `Escape` || evt.key === `Esc`) {
    //    evt.preventDefault();
    //    replaceFormToCard();
    //    document.removeEventListener(`keydown`, onEscKeyDown);
    //  }
    //};

    //eventComponent.setEditClickHandler(() => {
    //  replaceCardToForm();
    //  document.addEventListener(`keydown`, onEscKeyDown);
    //});

    //eventEditComponent.setFormSubmitHandler(() => {
    //  replaceFormToCard();
    //  document.removeEventListener(`keydown`, onEscKeyDown);
    //});

    //eventEditComponent.setEditCloseClickHandler(() => {
    //  replaceFormToCard();
    //  document.removeEventListener(`keydown`, onEscKeyDown);
    //});

    //render(this._eventsListComponent, eventComponent, RenderPosition.BEFOREEND);
    const eventPresenter = new EventPresenter(this._eventsListComponent)
    eventPresenter.init(trip)
  }

  _renderTrips() {
    this._boardTrips
      .forEach((boardTrip) => this._renderTrip(boardTrip));
  }

  _renderBoard() {
    this._renderSort();
    this._renderEventsList();
    this._renderTrips();
  }
}
