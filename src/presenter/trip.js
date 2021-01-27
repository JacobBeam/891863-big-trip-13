import SortView from "../view/trip-sort.js";
import EventsListView from "../view/trip-list.js";
import LoadingView from "../view/loading.js";
import EmptyEventListView from "../view/event-empty.js";
import EventPresenter, {State as EventPresenterViewState} from "./event.js";
import TripInfoPresenter from "./trip-info.js";
import EventNewPresenter from "./event-new.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter, sortDate, sortPrice, sortDuration, SortType, UpdateType, UserAction, FilterType} from "../utils/utils.js";
export default class Trip {

  constructor(boardContainer, tripInfoElement, pointsModel, filterModel, api) {
    this._boardContainer = boardContainer;
    this._tripInfoElement = tripInfoElement;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._api = api;


    this._eventPresenter = {};
    this._tripInfoPresenter = null;

    this._currentSortType = SortType.DATE_DEFAULT;
    this._isLoading = true;

    this._sortComponent = null;

    this._noPointsComponent = new EmptyEventListView();
    this._eventsListComponent = new EventsListView();
    this._loadingComponent = new LoadingView();

    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this.__handleViewAction);

    this.__handleViewAction = this.__handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);


    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this.__handleViewAction);

  }


  _getAllDestinations() {
    const destination = this._pointsModel.getAllDestinations();
    return destination;
  }

  _getAllOffers() {
    const offers = this._pointsModel.getAllOffers();
    return offers;
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


  init() {
    this._renderBoard();

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }


  createPoint(callback) {
    const destinations = this._getAllDestinations();
    const offers = this._getAllOffers();
    this._currentSortType = SortType.DATE_DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(callback, destinations, offers);
  }

  destroy({saveTripInfo = false} = {}) {
    if (!saveTripInfo) {
      this._clearBoard({resetSortType: true});
    } else {
      this._clearBoard({resetSortType: true, saveTripInfo: true});
    }

    this._currentSortType = SortType.DATE_DEFAULT;

    remove(this._eventsListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);

  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  __handleViewAction(actionType, updateType, update) {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updatePoint(update)
        .then((response)=>{
          this._pointsModel.updatePoint(updateType, response);
        })
        .catch(() => {
          this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_POINT:
        this._eventNewPresenter.setSaving();
        this._api.addPoint(update)
        .then((response) => {
          this._pointsModel.addPoint(updateType, response);
        })
        .catch(() => {
          this._eventNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_POINT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deletePoint(update)
        .then(() => {
          // метод удаления задачи на сервере
          // ничего не возвращает. Это и верно,
          // ведь что можно вернуть при удалении задачи?
          // Поэтому в модель мы всё также передаем update
          this._pointsModel.deletePoint(updateType, update);
        })
        .catch(() => {
          this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
    }
  }

  _handleModelEvent(updateType) {

    // В зависимости от типа изменений решаем, что делать:

    switch (updateType) {
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
    .values(this._eventPresenter)
    .forEach((presenter) => presenter.resetView());
  }

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
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._boardContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(trip) {
    const destinations = this._getAllDestinations();
    const offers = this._getAllOffers();
    const eventPresenter = new EventPresenter(this._eventsListComponent, this.__handleViewAction, this._handleModeChange);

    eventPresenter.init(trip, destinations, offers);
    this._eventPresenter[trip.id] = eventPresenter;
  }

  _renderTrips(points) {
    points.forEach((point) => this._renderEvent(point));
  }

  _renderNoPoints() {
    render(this._boardContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    const points = this._getPoints();

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderTripInfo();
    this._renderSort();
    this._renderEventsList();
    this._renderTrips(points);
  }

  _clearBoard({resetSortType = false, saveTripInfo = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointsComponent);
    remove(this._loadingComponent);

    if (!saveTripInfo) {
      this._tripInfoPresenter.destroy();
    }

    if (resetSortType) {
      this._currentSortType = SortType.DATE_DEFAULT;
    }
  }


}
