import SortView from "../view/trip-sort.js";
import EventsListView from "../view/trip-list.js";
import EventPresenter from "./event.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/utils.js";

export default class Board {

  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();

    this._handlerEventChange = this._handlerEventChange.bind(this);
    this._handlerModeChange = this._handlerModeChange.bind(this);
  }

  init(boardTrips) {
    this._boardTrips = boardTrips.slice();

    this._renderBoard();
  }

  _handlerEventChange(updateEvent) {
    this._boardTrips = updateItem(this._boardTrips, updateEvent);
    this._eventPresenter[updateEvent.id].init(updateEvent);
  }

  _handlerModeChange() {
    Object
    .values(this._eventPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._boardContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._boardContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(trip) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handlerEventChange, this._handlerModeChange);
    eventPresenter.init(trip);
    this._eventPresenter[trip.id] = eventPresenter;
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderTrips() {
    this._boardTrips
      .forEach((boardTrip) => this._renderEvent(boardTrip));
  }

  _renderBoard() {
    this._renderSort();
    this._renderEventsList();
    this._renderTrips();
  }
}
