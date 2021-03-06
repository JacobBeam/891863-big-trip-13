import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const EVENT_DATE_FORMAT = `MMM DD`;
const DASH = ` &mdash; `;
const ELLOPSIS = `...`;

const createTripInfoTemplate = (trips) => {

  const tripInfo = (trips.length <= 3) ? trips.map((trip) => trip.destination).join(DASH) : `${trips[0].destination} ${DASH} ${ELLOPSIS}  ${DASH} ${trips[trips.length - 1].destination}`;

  const startTripDate = dayjs(trips[0].startDate).format(EVENT_DATE_FORMAT);
  const endTripDate = dayjs(trips[trips.length - 1].endDate).format(EVENT_DATE_FORMAT);

  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${tripInfo}</h1>

  <p class="trip-info__dates">${startTripDate}&nbsp;&mdash;&nbsp;${endTripDate}</p>
</div>

</section>`;
};
export default class TripInfo extends AbstractView {

  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trips);
  }
}
