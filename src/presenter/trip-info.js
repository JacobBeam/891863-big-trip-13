import TripInfoView from "../view/trip-info.js";
import TripTotalPriceView from "../view/trip-price.js";
import {render, RenderPosition} from "../utils/render.js";

export default class TripInfo {

  constructor(renderContainer) {
    this._renderContainer = renderContainer;
  }

  init(tripsData) {
    this._tripsData = tripsData;

    this._tripInfoComponent = new TripInfoView(tripsData);
    this._tripTotalPriceComponent = new TripTotalPriceView(tripsData);

    render(this._renderContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripTotalPriceComponent, RenderPosition.BEFOREEND);
  }
}
