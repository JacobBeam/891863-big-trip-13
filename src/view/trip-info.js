import dayjs from "dayjs";

export const createTripInfoTemplate = (trips) => {
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
