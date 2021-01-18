import dayjs from "dayjs";
import SmartView from "./smart.js";
import {TYPES} from "../utils/const.js";

import flatpickr from "flatpickr";

const BLANK_EVENT = {
  eventType: TYPES[0].toLowerCase(),
  destination: ``,
  offers: [],
  startDate: (new Date()),
  endDate: (new Date()),
  destinationInfo: ``,
  destinationPhoto: [],
  eventPrice: ``,
  isFavorite: false};

const createNewTripTemplate = (trip = BLANK_EVENT, allDestinations) => {


  const {eventType,
    destination,
    offers,
    startDate,
    endDate,
    destinationInfo,
    destinationPhoto,
    offersList,
    eventPrice,
    isOffers,
    isDestinationInfo,
    isDestinationPhoto,
    isDisabled,
    isSaving
  } = trip;

  const startDateValue = dayjs(startDate).format(`DD/MM/YY HH:MM`);
  const endDateValue = dayjs(endDate).format(`DD/MM/YY HH:MM`);

  const createOffersTemplate = (offersData, offersByType, isData) => {

    return (isData) ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">

    ${offersByType.map(({title, price}, index) => {
    // Перебирать все значения возможных предложений, на каждом шаге искать в предложениях для точки соответствие текущего предложения по title и price, если соответствует, то ставить флаг в checked
    const isChecked = offersData.find((offer) => offer.title === title && offer.price === price) ? true : false;

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


  const offerstemplate = createOffersTemplate(offers, offersList, isOffers);


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

  const typesEventListtemplate = createTypesEventList(TYPES, eventType);


  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="./img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
${typesEventListtemplate}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${eventType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1" required>
      <datalist id="destination-list-1">
      ${allDestinations.map((city)=>`<option value="${city.name}"></option>`).join(``)}


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
      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${eventPrice}" required>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
          <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
 ${offerstemplate}

${destinationTemplate}
</section>

</form></li>`;
};

export default class NewEvent extends SmartView {

  constructor(destinations, offers) {
    super();
    this._destinations = destinations;
    this._offers = offers;
    this._data = NewEvent.parseEventToData(BLANK_EVENT, this._offers);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
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
    return createNewTripTemplate(this._data, this._destinations, this._offers);
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(event) {
    this.updateData(NewEvent.parseDataToEvent(event));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCancelClickHandler(this._callback.cancelClick);
  }

  _setStartDatepicker() {
    if (this._datepickerStart) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
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
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          minDate: dayjs(this._data.startDate).valueOf(),
          dateFormat: `d/m/Y H:i`,
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

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._eventTypeChangeHandler);

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._eventDestinationChangeHandler);

    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._eventPriceInputHandler);

    if (this._data.isOffers) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._offersChangeHandler);
    }
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
      this.getElement().querySelector(`.event__save-btn`).setAttribute(`disabled`, `true`);
    }

  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(NewEvent.parseDataToEvent(this._data));
  }


  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _formCancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelClick();
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formCancelClickHandler);
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
          isSaving: false
        }
    );
  }


  static parseDataToEvent(data) {
    let trip = Object.assign({}, data);

    delete trip.offersList;
    delete trip.isOffers;
    delete trip.isDestinationInfo;
    delete trip.isDestinationPhoto;
    delete trip.isDisabled;
    delete trip.isSaving;

    return trip;
  }

}
