import MenuView from "./view/menu.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatisticsView from "./view/statistics.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import BoardPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {MenuItem, UpdateType, isOnline} from "./utils/utils.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import {toast} from "./utils/toast/toast.js";
import NetworkErrorView from "./view/network-error.js";

const AUTHORIZATION = `Basic spdoufr5SDfyksdlf3a`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const headerElement = document.querySelector(`.page-body__container`);
const tripInfoElement = document.querySelector(`.trip-main`);
const eventsContentElement = document.querySelector(`.trip-events`);
const menuElement = tripInfoElement.querySelector(`.trip-controls`);
const pointAddButton = tripInfoElement.querySelector(`.trip-main__event-add-btn`);
let statisticsComponent = null;

const handlerPointNewFormClose = () => {
  pointAddButton.disabled = false;
};

const handleSiteMenuClick = (menuItem) => {

  siteMenuComponent.setMenuItem(menuItem);

  switch (menuItem) {
    case MenuItem.TABLE:
      boardPresenter.destroy();
      remove(statisticsComponent);
      boardPresenter.init();
      break;

    case MenuItem.STATISTICS:
      remove(statisticsComponent);
      boardPresenter.destroy({saveTripInfo: true});
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(eventsContentElement, statisticsComponent, RenderPosition.AFTER);

      break;
  }
};


const networkErrorComponent = new NetworkErrorView();

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

let siteMenuComponent = new MenuView();

const filterPresenter = new FilterPresenter(menuElement, pointsModel, filterModel);
const boardPresenter = new BoardPresenter(eventsContentElement, tripInfoElement, pointsModel, filterModel, apiWithProvider);

boardPresenter.init();


Promise.all([
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers(),
  apiWithProvider.getPoints()
])
  .then(([destinations, offers, points]) => {
    pointsModel.setAllDestinations(destinations);
    pointsModel.setAllOffers(offers);
    pointsModel.setPoints(UpdateType.INIT, points);

    filterPresenter.init();
    render(menuElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(menuElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

  pointAddButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (!isOnline()) {
      toast(`You can't create new point offline`);
      return;
    }

    boardPresenter.createPoint(handlerPointNewFormClose);
    evt.target.disabled = true;
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});


window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  remove(networkErrorComponent);

  if (!apiWithProvider.getIsSync()) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;

  render(headerElement, networkErrorComponent, RenderPosition.AFTERBEGIN);
});
