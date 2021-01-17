import PointsModel from "../model/points.js";
import {isOnline} from "../utils/utils.js";


const storeNameStructure = {
  POINTS: `POINTS`,
  OFFERS: `OFFERS`,
  DESTINATION: `DESTINATION`
};

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items, name) => {

  return items.reduce((acc, current) => {

    let currentName = ``;

    switch (name) {
      case storeNameStructure.POINTS:
        currentName = current.id;
        break;
      case storeNameStructure.OFFERS:
        currentName = current.type;
        break;
      case storeNameStructure.DESTINATION:
        currentName = current.name;
        break;
    }

    return Object.assign({}, acc, {
      [currentName]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSync = true;
  }

  getIsSync() {
    return this._isSync;
  }

  getPoints() {

    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer), storeNameStructure.POINTS);
          this._store.setItems(storeNameStructure.POINTS, items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems(storeNameStructure.POINTS));

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));

  }

  updatePoint(point) {

    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(storeNameStructure.POINTS, updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(storeNameStructure.POINTS, point.id, PointsModel.adaptToServer(Object.assign({}, point)));
    this._isSync = false;

    return Promise.resolve(point);

  }

  addPoint(point) {

    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(storeNameStructure.POINTS, newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error(`Add point failed`));
  }

  deletePoint(point) {

    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(storeNameStructure.POINTS, point.id));
    }

    return Promise.reject(new Error(`Delete point failed`));

  }

  getDestinations() {

    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations, storeNameStructure.DESTINATION);
          this._store.setItems(storeNameStructure.DESTINATION, items);
          return destinations;
        });
    }

    const storeDestination = Object.values(this._store.getItems(storeNameStructure.DESTINATION));

    return Promise.resolve(storeDestination);

  }

  getOffers() {

    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers, storeNameStructure.OFFERS);
          this._store.setItems(storeNameStructure.OFFERS, items);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems(storeNameStructure.OFFERS));

    return Promise.resolve(storeOffers);

  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems(storeNameStructure.POINTS));

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints], storeNameStructure.POINTS);
          this._store.setItems(storeNameStructure.POINTS, items);

          this._isSync = true;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }


}
