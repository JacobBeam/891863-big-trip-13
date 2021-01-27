import dayjs from "dayjs";
import he from "he";
import SmartView from "./smart.js";
import {TYPES} from "../utils/const.js";

import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const CHANGE_EVENT = `change`;
const INPUT_EVENT = `input`;
const SUBMIT_EVENT = `submit`;
const CLICK_EVENT = `click`;
const DATE_VALUE_FORMAT = `DD/MM/YY HH:mm`;
const DATEPICKER_DATE_FORMAT = `d/m/Y H:i`;
const ATTRIBUTE_DISABLED = `disabled`;
const VALUE_TRUE = `true`;
const SELECTOR_START_TIME = `#event-start-time-1`;
const SELECTOR_END_TIME = `#event-end-time-1`;
const SELECTOR_EVENT_TYPE_LIST = `.event__type-list`;
const SELECTOR_EVENT_INPUT_DESTINATION = `.event__input--destination`;
const SELECTOR_EVENT_INPUT_PRICE = `.event__input--price`;
const SELECTOR_EVENT_AVAILABLE_OFFERS = `.event__available-offers`;
const SELECTOR_EVENT_SAVE_BTN = `.event__save-btn`;
const SELECTOR_FORM = `form`;
const SELECTOR_EVENT_ROLLUP_BTN = `.event__rollup-btn`;
const SELECTOR_EVENT_RESET_BTN = `.event__reset-btn`;

const createEditTripTemplate = (data, allDestinations, isAdded) => {

  const {eventType,
    destination,
    offers,
    startDate,
    endDate,
    destinationInfo,
    destinationPhoto,
    eventPrice,
    offersList,
    isOffers,
    isDestinationInfo,
    isDestinationPhoto,
    isDisabled,
    isSaving,
    isDeleting
  } = data;

  const startDateValue = dayjs(startDate).format(DATE_VALUE_FORMAT);
  const endDateValue = dayjs(endDate).format(DATE_VALUE_FORMAT);

  const isSubmitDisabled = (startDate > endDate);

  const createOffersTemplate = (offersData, offersByType, isData) => {

    return (isData) ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">

${offersByType.map(({title, price}, index) => {
    const findSomeOffer = (offer)=> offer.title === title && offer.price === price;
    const isChecked = offersData.some(findSomeOffer);

    return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" value="${index}" name="event-offer-${index}" ${isChecked ? `checked` : ``}>
  <label class="event__offer-label" for="event-offer-${index}">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
  }).join(``)}
</div>
</section>` : ` `;
  };

  const offersTemplate = createOffersTemplate(offers, offersList, isOffers);

  const createDestinationInfoTemplate = (info, isInfo) => {
    return isInfo ? `<p class="event__destination-description">${info}</p>` : ` `;
  };

  const createDestinationPhotoTemplate = (photo, isPhoto) => {

    return isPhoto ? ` <div class="event__photos-container">
<div class="event__photos-tape">

${photo.map((value) => `<img class="event__photo" src= "${value.src}" alt="${value.description}">`).join(``)}

</div>
</div>` : ` `;
  };

  const destinationInfoTemplate = createDestinationInfoTemplate(destinationInfo, isDestinationInfo);
  const destinationPhotoTemplate = createDestinationPhotoTemplate(destinationPhoto, isDestinationPhoto);

  const createDestinationTemplate = (infoTemplate, isInfo, photoTemplate, isPhoto) => {

    if (isInfo || isPhoto) {

      return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  ${infoTemplate ? infoTemplate : ``}
  ${photoTemplate ? photoTemplate : ``}
  </section> `;
    }
    return ``;
  };

  const destinationTemplate = createDestinationTemplate(destinationInfoTemplate, isDestinationInfo, destinationPhotoTemplate, isDestinationPhoto);

  const createTypesEventList = (types, typeEvent) => {
    return `<div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

${types.map((type) => `<div class="event__type-item">
<input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}"  ${typeEvent.toLowerCase() === type.toLowerCase() ? `checked` : ``}>
<label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
</div>
`).join(``)}
        </fieldset>
      </div>`;
  };

  const typesEventListTemplate = createTypesEventList(TYPES, eventType);


  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="./img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
${typesEventListTemplate}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${eventType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination)}" list="destination-list-1" required>
      <datalist id="destination-list-1">
      ${allDestinations.map((city)=>`<option value="${he.encode(city.name)}"></option>`).join(``)}

      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateValue}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateValue}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" step="1" min="0" name="event-price" value="${eventPrice}" required>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
    <button class="event__reset-btn" type="reset"> ${isAdded ? `Cancel` : `${isDeleting ? `Deleting...` : `Delete`}`}</button>
    ${isAdded ? `` : `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`}


  </header>
  <section class="event__details">
 ${offersTemplate}

${destinationTemplate}
</section>

</form></li>`;
};
export default class EventForm extends SmartView {

  constructor(trip, destinations, offers, isAdded) {
    super();
    this._destinations = destinations.slice();
    this._offers = offers;
    this._data = EventForm.parseEventToData(trip, this._offers);
    this._isAdded = isAdded;
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editCloseClickHandler = this._editCloseClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formCancelClickHandler = this._formCancelClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceInputHandler = this._eventPriceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  getTemplate() {
    return createEditTripTemplate(this._data, this._destinations, this._isAdded);
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);

    if (this._isAdded) {
      this.setCancelClickHandler(this._callback.cancelClick);
    } else {
      this.setEditCloseClickHandler(this._callback.editCloseClick);
      this.setDeleteClickHandler(this._callback.deleteClick);
    }
  }

  reset(trip) {
    this.updateData(EventForm.parseDataToEvent(trip));
  }

  _setStartDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(SELECTOR_START_TIME),
        {
          enableTime: true,
          dateFormat: DATEPICKER_DATE_FORMAT,
          defaultDate: this._data.startDate,
          onChange: this._startDateChangeHandler
        }
    );
  }

  _startDateChangeHandler(userDate) {
    if (dayjs(userDate).toDate() > dayjs(this._datepickerEnd.selectedDates).toDate()) {
      this.updateData({
        startDate: dayjs(userDate).toDate(),
        endDate: dayjs(userDate).toDate()
      });
    } else {
      this.updateData({
        startDate: dayjs(userDate).toDate()
      });
    }
  }

  _setEndDatepicker() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(SELECTOR_END_TIME),
        {
          enableTime: true,
          minDate: dayjs(this._data.startDate).valueOf(),
          dateFormat: DATEPICKER_DATE_FORMAT,
          defaultDate: this._data.endDate,
          onChange: this._endDateChangeHandler
        }
    );
  }

  _endDateChangeHandler(userDate) {
    this.updateData({
      endDate: dayjs(userDate).toDate()
    });
  }

  _offersChangeHandler(evt) {
    const newOffers = this._data.offers.slice();
    const index = newOffers.findIndex((offer)=>offer.title === this._data.offersList[evt.target.value].title);

    if (index > -1) {
      newOffers.splice(index, 1);
    } else {
      newOffers.push(this._data.offersList[evt.target.value]);
    }

    this.updateData({
      offers: newOffers
    }, true);
  }

  _eventPriceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      eventPrice: evt.target.value
    }, true);
  }

  _eventTypeChangeHandler(evt) {
    const offersByType = this._offers.filter((offer) => offer.type === evt.target.value);
    const [newOffer] = offersByType;

    this.updateData({
      eventType: evt.target.value,
      offers: [],
      offersList: newOffer.offers,
      isOffers: newOffer.offers.length !== 0
    });
  }

  _eventDestinationChangeHandler(evt) {
    const [newDestination] = this._destinations.filter((destination) => destination.name === evt.target.value);
    const destinationList = this._destinations.map((city) => city.name);

    if (destinationList.includes(evt.target.value)) {
      this.updateData({
        destination: evt.target.value,
        destinationInfo: newDestination.description,
        destinationPhoto: newDestination.pictures,
        isDestinationInfo: newDestination.description.length !== 0,
        isDestinationPhoto: newDestination.pictures.length !== 0
      });
    } else {
      this.getElement().querySelector(SELECTOR_EVENT_SAVE_BTN).setAttribute(ATTRIBUTE_DISABLED, VALUE_TRUE);
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventForm.parseDataToEvent(this._data));
  }

  _editCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.editCloseClick();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventForm.parseDataToEvent(this._data));
  }

  _formCancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelClick();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(SELECTOR_EVENT_TYPE_LIST)
      .addEventListener(CHANGE_EVENT, this._eventTypeChangeHandler);

    this.getElement()
      .querySelector(SELECTOR_EVENT_INPUT_DESTINATION)
      .addEventListener(CHANGE_EVENT, this._eventDestinationChangeHandler);

    this.getElement()
      .querySelector(SELECTOR_EVENT_INPUT_PRICE)
      .addEventListener(INPUT_EVENT, this._eventPriceInputHandler);

    if (this._data.isOffers) {
      this.getElement()
        .querySelector(SELECTOR_EVENT_AVAILABLE_OFFERS)
        .addEventListener(CHANGE_EVENT, this._offersChangeHandler);
    }
  }
  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(SELECTOR_FORM).addEventListener(SUBMIT_EVENT, this._formSubmitHandler);
  }

  setEditCloseClickHandler(callback) {
    this._callback.editCloseClick = callback;
    this.getElement().querySelector(SELECTOR_EVENT_ROLLUP_BTN).addEventListener(CLICK_EVENT, this._editCloseClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(SELECTOR_EVENT_RESET_BTN).addEventListener(CLICK_EVENT, this._formDeleteClickHandler);
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector(SELECTOR_EVENT_RESET_BTN).addEventListener(CLICK_EVENT, this._formCancelClickHandler);
  }

  static parseEventToData(trip, allOffers) {

    const [offersByType] = allOffers.filter((offer)=> offer.type === trip.eventType);

    return Object.assign(
        {},
        trip,
        {
          offersList: offersByType.offers,
          isOffers: offersByType.offers.length !== 0,
          isDestinationInfo: trip.destinationInfo.length !== 0,
          isDestinationPhoto: trip.destinationPhoto.length !== 0,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {

    const trip = Object.assign({}, data);

    delete trip.offersList;
    delete trip.isOffers;
    delete trip.isDestinationInfo;
    delete trip.isDestinationPhoto;
    delete trip.isDisabled;
    delete trip.isSaving;
    delete trip.isDeleting;

    return trip;
  }
}
