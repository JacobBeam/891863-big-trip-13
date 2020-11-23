import dayjs from "dayjs";

export const createTripItemTemplate = (trip) => {

  const {eventType, destination, offers, startDate, endDate, eventPrice, isFavorite} = trip;

   const eventDate = dayjs(startDate).format(`MMM DD`);
  const eventStartTime = dayjs(startDate).format(`hh mm`);
  const eventEndTime = dayjs(endDate).format(`hh mm`);


  const findEventDuration = () => {

    const duration = dayjs(endDate).diff(dayjs(startDate), `minute`);

    let stringDuration = ``;

    if (duration < 60) {
      if (duration < 10) {
        stringDuration = `0${duration}M`;
      } else if (duration === 0) {
        stringDuration = `00M`;
      } else {
        stringDuration = `${duration}M`;
      }
    } else if (duration < 60 * 24) {
      let hours = Math.floor(duration / 60);

      if (hours < 10) {
        stringDuration = `0${hours}H`;
      } else {
        stringDuration = `${hours}H`;
      }

      let minutes = duration - hours * 60;
      if (minutes < 10) {
        stringDuration += ` 0${minutes}M`;
      } else if (minutes === 0) {
        stringDuration += ` 00M`;
      } else {
        stringDuration += ` ${minutes}M`;
      }
    } else {
      let days = Math.floor(duration / 60 / 24);
      if (days < 10) {
        stringDuration = `0${days}D`;
      } else {
        stringDuration = `${days}D`;
      }

      let hours = Math.floor((duration - days * 24 * 60) / 60);
      if (hours < 10) {
        stringDuration += ` 0${hours}H`;
      } else {
        stringDuration += ` ${hours}H`;
      }

      let minutes = duration - days * 24 * 60 - hours * 60;
      if (minutes < 10) {
        stringDuration += ` 0${minutes}M`;
      } else if (minutes === 0) {
        stringDuration += ` 00M`;
      } else {
        stringDuration += ` ${minutes}M`;
      }

    }

    return stringDuration;
  };

  const eventDuration = findEventDuration();

  const createTripOffersTemplate = (offersArray) => {

    return offersArray.filter((offer) => offer.isAdded).map(({type, price}) =>
      `<li class="event__offer">
  <span class="event__offer-title">${type}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`).join(``);
  };

  const tripOffersTemplate = createTripOffersTemplate(offers);

  const favoriteClassName = isFavorite
    ? `event__favorite-btn--active`
    : ``;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${eventDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="./img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${eventType} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T14:30">${eventStartTime}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T16:05">${eventEndTime}</time>
      </p>
      <p class="event__duration">${eventDuration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
${tripOffersTemplate}
    </ul>
    <button class="event__favorite-btn  ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
