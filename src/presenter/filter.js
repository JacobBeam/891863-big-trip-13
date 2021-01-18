import FilterView from "../view/filter.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UpdateType} from "../utils/utils.js";

export default class Filter {

  constructor(filterContainer, pointsModel, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._currentFilter = null;

    this._filterComponent = null;

    this._handlerModelEvent = this._handlerModelEvent.bind(this);
    this._handlerFilterTypeChange = this._handlerFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handlerModelEvent);
    this._pointsModel.addObserver(this._handlerModelEvent);
  }

  init() {
    const pointsInfo = this._getPoints();

    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._currentFilter, pointsInfo);
    this._filterComponent.setFilterTypeChangeHandler(this._handlerFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _getPoints() {
    return this._pointsModel.getPoints().slice();
  }

  _handlerModelEvent() {
    this.init();
  }

  _handlerFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

}
