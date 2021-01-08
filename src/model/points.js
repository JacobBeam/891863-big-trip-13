import Observer from "../utils/observer.js";
export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._offers = [];
    this._destinations = [];
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

    const adaptedPoint = Object.assign(
        {},
        point,
        {
          eventType: point.type,
          destination: point.destination.name,

          startDate: new Date(point.date_from),
          endDate: new Date(point.date_to),
          destinationInfo: point.destination.description,
          eventPrice: point.base_price,
          isFavorite: point.is_favorite,
          destinationPhoto: point.destination.pictures,
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
          "destination": {
            "name": point.destination,
            "description": point.destinationInfo,
            "pictures": point.destinationPhoto
          },
          "date_from": point.startDate.toISOString(),
          "date_to": point.endDate.toISOString(),
          "base_price": +point.eventPrice,
          "is_favorite": point.isFavorite,
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
