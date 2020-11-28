import dayjs from "dayjs";
import {createElement} from "./utils.js";

const createTripInfoTemplate = (trips) => {
  let tripInfo = ``;
  if (trips.length <= 3) {
    tripInfo = trips.map((trip) => trip.destination).join(` &mdash; `);
  } else {
    tripInfo = `${trips[0].destination} &mdash; ...  &mdash; ${trips[trips.length - 1].destination}`;
  }

  const startTripDate = dayjs(trips[0].startDate).format(`MMM DD`);
  const endTripDate = dayjs(trips[trips.length - 1].endDate).format(`MMM DD`);

  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${tripInfo}</h1>

  <p class="trip-info__dates">${startTripDate}&nbsp;&mdash;&nbsp;${endTripDate}</p>
</div>

</section>`;
};
export default class TripInfo {

  constructor(trips) {
    this._trips = trips;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trips);
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
