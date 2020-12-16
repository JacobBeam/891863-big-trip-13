import AbstractView from "./abstract.js";

const createTripPriceTemplate = (trips) => {

  const eventsPrice = trips.reduce((accumulator, currentValue) => accumulator + currentValue.eventPrice, 0);
  //  let offerPrice = 0;
  //  trips.filter((value) => value.offers.length > 0)
  //  .map((value) => value.offers)
  //  .forEach((value) => value.forEach((val) => {
  //    if (val.isAdded === true) {
  //      offerPrice += val.price;
  //    }
  //  }));

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${eventsPrice}</span>
</p>`;
};
export default class TotalPrice extends AbstractView {

  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripPriceTemplate(this._trips);
  }
}
