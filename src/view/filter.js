import AbstractView from "./abstract.js";
import {FilterType} from "../utils/utils.js";

const CHANGE_EVENT = `change`;

const createFilterTemplate = (currentFilterType, points) => {

  const isFuturePoints = (points.slice().filter((point) => point.startDate >= new Date()).length) > 0;
  const isPastPoints = (points.slice().filter((point) => point.endDate < new Date()).length) > 0;

  return `<form class="trip-filters" action="#" method="get">
  <h2 class="visually-hidden">Filter events</h2>
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVERYTHING ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${currentFilterType === FilterType.FUTURE ? `checked` : ``} ${isFuturePoints ? `` : `disabled`}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${currentFilterType === FilterType.PAST ? `checked` : ``} ${isPastPoints ? `` : `disabled`}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};
export default class Filter extends AbstractView {

  constructor(currentFilterType, points) {
    super();
    this._currentFilter = currentFilterType;
    this._points = points;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._currentFilter, this._points);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(CHANGE_EVENT, this._filterTypeChangeHandler);
  }
}
