import SortView from "../view/trip-sort.js";
import EventsListView from "../view/trip-list.js";
import EmptyEventListView from "../view/event-empty.js";
import EventPresenter from "./event.js";
import TripInfoPresenter from "./trip-info.js";
import EventNewPresenter from "./event-new.js";


//  import TripInfoView from "../view/trip-info.js";
//  import TripTotalPriceView from "../view/trip-price.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter, sortDate, sortPrice, sortDuration, SortType, UpdateType, UserAction, FilterType} from "../utils/utils.js";
export default class Board {

  constructor(boardContainer, tripInfoElement, pointsModel, filterModel) {
    this._boardContainer = boardContainer;
    this._tripInfoElement = tripInfoElement;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._eventPresenter = {};
    this._tripInfoPresenter = null;

    this._currentSortType = SortType.DATE_DEFAULT;

    this._sortComponent = null;

    this._noPointsComponent = new EmptyEventListView();
    this._eventsListComponent = new EventsListView();

    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._handlerViewAction);

    this._handlerViewAction = this._handlerViewAction.bind(this);
    this._handlerModelEvent = this._handlerModelEvent.bind(this);
    this._handlerModeChange = this._handlerModeChange.bind(this);
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);


    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._handlerViewAction);

  }

  init() {
    this._renderBoard();

    this._pointsModel.addObserver(this._handlerModelEvent);
    this._filterModel.addObserver(this._handlerModelEvent);

  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DURATION:
        return filteredPoints.sort(sortDuration);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }

    return filteredPoints.sort(sortDate);
  }

  createPoint(callback) {
    this._currentSortType = SortType.DATE_DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(callback);
  }

  _handlerSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handlerViewAction(actionType, updateType, update) {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handlerModelEvent(updateType) {

    // В зависимости от типа изменений решаем, что делать:

    switch (updateType) {
      // case UpdateType.PATCH:
      //  - обновить часть списка (например, когда поменялась цена)
      //  this._pointsModel[data.id].init(data);
      //  break;
      case UpdateType.MINOR:
        // - обновить список (например, когда)
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handlerModeChange() {
    this._eventNewPresenter.destroy();
    Object
    .values(this._eventPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  //  Меняем tripInfo.init(this._boardTrips) убираем аргумент
  //  Передавать данные только с сортировкой по дате
  _renderTripInfo() {
    const tripInfoPresenter = new TripInfoPresenter(this._tripInfoElement, this._pointsModel);
    tripInfoPresenter.init();
    this._tripInfoPresenter = tripInfoPresenter;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handlerSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._boardContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  //  _renderInfo() {
  //  render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  //  }


  _renderEvent(trip) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handlerViewAction, this._handlerModeChange);
    eventPresenter.init(trip);
    this._eventPresenter[trip.id] = eventPresenter;
  }


  _renderTrips(points) {
    points.forEach((point) => this._renderEvent(point));
  }

  _renderNoPoints() {
    render(this._boardContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    const points = this._getPoints();

    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    //  Можно вынести отдельно _renderTripInfo в init и проверять
    //  на обновление при сабмите (если менялся тип маршрута
    //   или доп опции, то перерисовывать только Info, а не весь Board,
    //    добавить к Minor, major еще и pacth)
    this._renderTripInfo();
    this._renderSort();
    this._renderEventsList();
    this._renderTrips(points);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointsComponent);
    this._tripInfoPresenter.destroy();

    if (resetSortType) {
      this._currentSortType = SortType.DATE_DEFAULT;
    }
  }

  destroy(){
    this._clearBoard({ resetSortType: true});
    this._currentSortType = SortType.DATE_DEFAULT;

    remove(this._eventsListComponent);

    this._pointsModel.removeObserver(this._handlerModelEvent);
    this._filterModel.removeObserver(this._handlerModelEvent);

  }
}
