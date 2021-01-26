import PointsModel from "../model/points.js";

const URL_POINTS = `points`;
const URL_DESTINATIONS = `destinations`;
const URL_OFFERS =`offers`
const URL_SYNC = `sync`
const HEADER_CONTENT_TYPE = `application/json`;
const HEADER_AUTHORIZATION = `Authorization`;

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: URL_POINTS})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }


  updatePoint(point) {
    return this._load({
      url: `${URL_POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": HEADER_CONTENT_TYPE})
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }


  addPoint(point) {
    return this._load({
      url: URL_POINTS,
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": HEADER_CONTENT_TYPE})
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `${URL_POINTS}/${point.id}`,
      method: Method.DELETE
    });
  }

  getDestinations() {
    return this._load({url: URL_DESTINATIONS})
      .then(Api.toJSON);
  }

  getOffers() {
    return this._load({url: URL_OFFERS})
      .then(Api.toJSON);
  }

  sync(data) {
    return this._load({
      url: `${URL_POINTS}/${URL_SYNC}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": HEADER_CONTENT_TYPE})
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(HEADER_AUTHORIZATION, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
