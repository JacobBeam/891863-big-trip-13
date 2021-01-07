import Observer from "../utils/observer.js";

// убрать и заменить на получение данных с сервера
import {offersMapClear} from "../view/mock.js"
export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._offers=[];
    this._destinations=[];
  }

  setAllOffers(offers) {
    this._offers = offers.slice();

  }

  getAllOffers() {
    return this._offers;
  }

  setAllDestinations(destinations) {
    this._destinations = destinations.slice();

  }

  getAllDestinations() {
    return this._destinations;
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    console.log(point.id)
    console.log(update.id)
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {

// Убрать из адаптера offers, переделать edit и new представления (view)

//    const offersByType = JSON.parse(JSON.stringify(offersMapClear));

//    const getAddaptedOffers = (offersByType, point)=>{
//    //offersByType.filter((offer)=> offer.type===point.type)
//    let [newOffer] = offersByType.filter((offer)=> offer.type===point.type)



//    console.log(newOffer.offers)

//    newOffer.offers.map((offer)=>{
//let isChecked = point.offers.find((of)=> of.title === offer.title)? true : false;
//console.log(Object.assign({}, offer, {isAdded:isChecked}));
//return Object.assign( offer, {isAdded:isChecked})
//    })
//    console.log(newOffer.offers)
//    console.log(`---------------`)
//    return newOffer.offers
//  }


    const adaptedPoint = Object.assign(
        {},
        point,
        {
          eventType:point.type,
          destination:point.destination.name,

          startDate: new Date(point.date_from),
          endDate: new Date(point.date_to),
          destinationInfo: point.destination.description,
          eventPrice:point.base_price,
          isFavorite:point.is_favorite,
          destinationPhoto:point.destination.pictures,
          //offers:getAddaptedOffers(offersByType,point)
        }
    );


    delete adaptedPoint.type;
    delete adaptedPoint.destination.name;
    delete adaptedPoint.destination.description;
    delete adaptedPoint.destination.pictures;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;



    return adaptedPoint;
  }


  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {

          "type": point.eventType.toLowerCase(),
          "destination": {"name":point.destination,
          "description": point.destinationInfo,
          "pictures": point.destinationPhoto
        },
        "date_from":point.startDate.toISOString(),
        "date_to":point.endDate.toISOString(),
        "base_price": +point.eventPrice,
        "is_favorite": point.isFavorite,
        //"offers":point.offers.filter((offer)=>offer.isAdded===true).map((offer)=>{
        //  delete offer.isAdded
        //return offer
        //})
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.eventType;
    delete adaptedPoint.destinationInfo;
    delete adaptedPoint.destinationPhoto;
    delete adaptedPoint.startDate;
    delete adaptedPoint.endDate;
    delete adaptedPoint.eventPrice;
    delete adaptedPoint.isFavorite;


    return adaptedPoint;
  }
}
