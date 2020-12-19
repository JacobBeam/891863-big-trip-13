import TripInfoView from "../view/trip-info.js";
import TripTotalPriceView from "../view/trip-price.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortDate} from "../utils/utils.js";

export default class TripInfo {

  constructor(renderContainer, pointsModel) {
    this._renderContainer = renderContainer;
    this._pointsModel = pointsModel;

  }

  init() {
    const pointsInfo=this._getPoints()

    this._tripInfoComponent = new TripInfoView(pointsInfo);
    this._tripTotalPriceComponent = new TripTotalPriceView(pointsInfo);

    render(this._renderContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripTotalPriceComponent, RenderPosition.BEFOREEND);
  }

  _getPoints(){
    return this._pointsModel.getPoints().slice().sort(sortDate);
  }

  destroy() {
    remove(this._tripInfoComponent);
    remove(this._tripTotalPriceComponent);
  }
}
