import PointsModel from "../model/points.js";
import {isOnline} from "../utils/utils.js";


const StoreNameStructure = {
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
      case StoreNameStructure.POINTS:
        currentName = current.id;
        break;
      case StoreNameStructure.OFFERS:
        currentName = current.type;
        break;
      case StoreNameStructure.DESTINATION:
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
          const items = createStoreStructure(points.map(PointsModel.adaptToServer), StoreNameStructure.POINTS);
          this._store.setItems(StoreNameStructure.POINTS, items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems(StoreNameStructure.POINTS));

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));

  }

  updatePoint(point) {

    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(StoreNameStructure.POINTS, updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(StoreNameStructure.POINTS, point.id, PointsModel.adaptToServer(Object.assign({}, point)));
    this._isSync = false;

    return Promise.resolve(point);

  }

  addPoint(point) {

    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(StoreNameStructure.POINTS, newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error(`Add point failed`));
  }

  deletePoint(point) {

    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(StoreNameStructure.POINTS, point.id));
    }

    return Promise.reject(new Error(`Delete point failed`));

  }

  getDestinations() {

    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations, StoreNameStructure.DESTINATION);
          this._store.setItems(StoreNameStructure.DESTINATION, items);
          return destinations;
        });
    }

    const storeDestination = Object.values(this._store.getItems(StoreNameStructure.DESTINATION));

    return Promise.resolve(storeDestination);

  }

  getOffers() {

    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers, StoreNameStructure.OFFERS);
          this._store.setItems(StoreNameStructure.OFFERS, items);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems(StoreNameStructure.OFFERS));

    return Promise.resolve(storeOffers);

  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems(StoreNameStructure.POINTS));

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints], StoreNameStructure.POINTS);
          this._store.setItems(StoreNameStructure.POINTS, items);

          this._isSync = true;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }


}
