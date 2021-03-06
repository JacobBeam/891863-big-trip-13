import dayjs from "dayjs";
import {findEventDuration} from "../utils/utils.js";
import AbstractView from "./abstract.js";


const EVENT_DATE_FORMAT = `MMM DD`;
const EVENT_TIME_FORMAT = `HH:mm`;
const CLICK_EVENT = `click`;
const SELECTOR_EVENT_ROLLUP_BTN = `.event__rollup-btn`;
const SELECTOR_EVENT_FAVORITE_BTN = `.event__favorite-btn`;

const createTripItemTemplate = (trip) => {

  const {eventType,
    destination,
    offers,
    startDate,
    endDate,
    eventPrice,
    isFavorite} = trip;

  const eventDate = dayjs(startDate).format(EVENT_DATE_FORMAT);
  const eventStartTime = dayjs(startDate).format(EVENT_TIME_FORMAT);
  const eventEndTime = dayjs(endDate).format(EVENT_TIME_FORMAT);
  const eventDuration = findEventDuration(startDate, endDate);

  const createTripOffersTemplate = (data) => {

    return data.map(({title, price}) =>
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
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

export default class EventItem extends AbstractView {

  constructor(trip) {
    super();
    this._trip = trip;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createTripItemTemplate(this._trip);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(SELECTOR_EVENT_ROLLUP_BTN).addEventListener(CLICK_EVENT, this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(SELECTOR_EVENT_FAVORITE_BTN).addEventListener(CLICK_EVENT, this._favoriteClickHandler);
  }

}
