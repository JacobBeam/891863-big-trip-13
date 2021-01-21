import AbstractView from "./abstract.js";

const createTripPriceTemplate = (trips) => {

  const eventsPrice = trips.reduce((accumulator, currentValue) => accumulator + Number(currentValue.eventPrice) + currentValue.offers.reduce((startPrice, offer)=> (startPrice + Number(offer.price)), 0), 0);

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
