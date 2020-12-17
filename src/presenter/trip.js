import SortView from "../view/trip-sort.js";
import EventsListView from "../view/trip-list.js";
import EventPresenter from "./event.js";
import TripInfoPresenter from "./trip-info.js";
//  import TripInfoView from "../view/trip-info.js";
//  import TripTotalPriceView from "../view/trip-price.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem, sortDate, sortPrice, sortDuration, SortType} from "../utils/utils.js";

export default class Board {

  constructor(boardContainer, tripInfoElement) {
    this._boardContainer = boardContainer;
    this._tripInfoElement = tripInfoElement;
    this._eventPresenter = {};
    this._currentSortType = SortType.DATE_DEFAULT;

    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();

    this._handlerEventChange = this._handlerEventChange.bind(this);
    this._handlerModeChange = this._handlerModeChange.bind(this);
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);
  }

  init(boardTrips) {
    this._boardTrips = boardTrips.slice();
    this._boardTrips.sort(sortDate);

    this._renderBoard();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.DURATION:
        this._boardTrips.sort(sortDuration);
        break;
      case SortType.PRICE:
        this._boardTrips.sort(sortPrice);
        break;
      default:
        this._boardTrips.sort(sortDate);
    }

    this._currentSortType = sortType;
  }

  _handlerSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);

    this._clearEventList();
    this._renderTrips();
  }

  //  По ТЗ: После сохранения изменений точка маршрута располагается в списке точек
  //  маршрута в порядке определённом текущей сортировкой
  //  (по дате, по длительности или по стоимости).
  //  Нужно добавить сортировку данных и перерисовку карточек, но перерисовка кроме сабмита будет и при добавлении значка в избранное
  //  Возможно, добавить параметр для проверки, вызывается ли функция в форме
  _handlerEventChange(updateEvent) {
    this._boardTrips = updateItem(this._boardTrips, updateEvent);
    this._eventPresenter[updateEvent.id].init(updateEvent);
  }

  _handlerModeChange() {
    Object
    .values(this._eventPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  _renderTripInfo() {
    const tripInfo = new TripInfoPresenter(this._tripInfoElement);
    tripInfo.init(this._boardTrips);
    //  this._tripInfoComponent = new TripInfoView(this._boardTrips);
    //  this._tripTotalPriceComponent = new TripTotalPriceView(this._boardTrips);
    //  render(this._tripInfoElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    //  render(this._tripInfoComponent, this._tripTotalPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handlerSortTypeChange);
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
    this._renderTripInfo();
    this._renderSort();
    this._renderEventsList();
    this._renderTrips();
  }
}
