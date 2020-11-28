import {createElement} from "./utils.js";

const createTripPriceTemplate = (trips) => {

  const eventsPrice = trips.reduce((accumulator, currentValue) => accumulator + currentValue.eventPrice, 0);
  let offerPrice = 0;
  trips.filter((value) => value.offers.length > 0)
    .map((value) => value.offers)
    .forEach((value) => value.forEach((val) => {
      if (val.isAdded === true) {
        offerPrice += val.price;
      }
    }));

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${eventsPrice + offerPrice}</span>
</p>`;
};
export default class TotalPrice {

  constructor(trips) {
    this._trips = trips;
    this._element = null;
  }

  getTemplate() {
    return createTripPriceTemplate(this._trips);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
