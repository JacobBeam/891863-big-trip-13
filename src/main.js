import MenuView from "./view/menu.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatisticsView from "./view/statistics.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {MenuItem, UpdateType, isOnline} from "./utils/utils.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import {toast} from "./utils/toast/toast.js";
import NetworkErrorView from "./view/network-error.js";

const AUTHORIZATION = `Basic spdoufr5SDfyksdlf`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const CLICK_EVENT = `click`;
const ONLINE_EVENT = `online`;
const OFFLINE_EVENT = `offline`;
const LOAD_EVENT = `load`;
const SW_FILE_NAME = `./sw.js`;
const TOAST_ERROR_CREATE = `You can't create new point offline`;
const SELECTOR_PAGE_BODY_CONTAINER = `.page-body__container`;
const SELECTOR_TRIP_MAIN = `.trip-main`;
const SELECTOR_TRIP_EVENTS = `.trip-events`;
const SELECTOR_TRIP_CONTROLS = `.trip-controls`;
const SELECTOR_EVENT_ADD_BTN = `.trip-main__event-add-btn`;

const headerElement = document.querySelector(SELECTOR_PAGE_BODY_CONTAINER);
const tripInfoElement = document.querySelector(SELECTOR_TRIP_MAIN);
const eventsContentElement = document.querySelector(SELECTOR_TRIP_EVENTS);
const menuElement = tripInfoElement.querySelector(SELECTOR_TRIP_CONTROLS);
const pointAddButton = tripInfoElement.querySelector(SELECTOR_EVENT_ADD_BTN);
let statisticsComponent = null;

const handlePointNewFormClose = () => {
  pointAddButton.disabled = false;
};

const handleSiteMenuClick = (menuItem) => {

  siteMenuComponent.setMenuItem(menuItem);

  switch (menuItem) {
    case MenuItem.TABLE:

      tripPresenter.destroy();
      remove(statisticsComponent);
      tripPresenter.init();
      pointAddButton.disabled = false;
      break;

    case MenuItem.STATISTICS:
      remove(statisticsComponent);
      tripPresenter.destroy({saveTripInfo: true});
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(eventsContentElement, statisticsComponent, RenderPosition.AFTER);
      pointAddButton.disabled = true;
      break;
  }
};

const networkErrorComponent = new NetworkErrorView();

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const siteMenuComponent = new MenuView();

const filterPresenter = new FilterPresenter(menuElement, pointsModel, filterModel);
const tripPresenter = new TripPresenter(eventsContentElement, tripInfoElement, pointsModel, filterModel, apiWithProvider);

tripPresenter.init();


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

pointAddButton.addEventListener(CLICK_EVENT, (evt) => {
  evt.preventDefault();

  if (!isOnline()) {
    toast(TOAST_ERROR_CREATE);
    return;
  }

  tripPresenter.createPoint(handlePointNewFormClose);
  evt.target.disabled = true;
});

window.addEventListener(LOAD_EVENT, () => {
  navigator.serviceWorker.register(SW_FILE_NAME);
});


window.addEventListener(ONLINE_EVENT, () => {
  document.title = document.title.replace(` [${OFFLINE_EVENT}]`, ``);

  remove(networkErrorComponent);

  if (!apiWithProvider.getIsSync()) {
    apiWithProvider.sync();
  }
});

window.addEventListener(OFFLINE_EVENT, () => {
  document.title += ` [${OFFLINE_EVENT}]`;

  render(headerElement, networkErrorComponent, RenderPosition.AFTERBEGIN);
});
