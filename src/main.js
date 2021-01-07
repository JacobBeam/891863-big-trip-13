//  import TripInfoView from "./view/trip-info.js";
//  import TotalPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
//  import NewEventView from "./view/event-new.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatisticsView from "./view/statistics.js";
//  import OptionsModel from "./model/options.js";
import {generateEventTrip} from "./view/mock.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import BoardPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {MenuItem, UpdateType} from "./utils/utils.js";
import Api from "./api.js";

const TRIP_COUNT = 25;
const AUTHORIZATION = `Basic spdoufr5SDfyksdlf`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip);

console.log(trips);

const api= new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();


const filterModel = new FilterModel();



//api.getDestination().then((destinations) => {
//  console.log(destinations);
//  pointsModel.setAllDestinations(destinations)
//});

//api.getOffers().then((offers) => {
//  console.log(offers);
//  pointsModel.setAllOffers(offers)
////let newoffers = offers.filter((offer)=> offer.type===`taxi`)
////console.log(newoffers)
//});


//pointsModel.setPoints(trips);



//  const optionsModel= new OptionsModel()
//  optionsModel.setTasks(trips)


const tripInfoElement = document.querySelector(`.trip-main`);
const eventsContentElement = document.querySelector(`.trip-events`);
const menuElement = tripInfoElement.querySelector(`.trip-controls`);


let siteMenuComponent = new MenuView();

const filterPresenter = new FilterPresenter(menuElement, filterModel);
const boardPresenter = new BoardPresenter(eventsContentElement, tripInfoElement, pointsModel, filterModel, api);

filterPresenter.init();
boardPresenter.init();

let statisticsComponent = null;

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


const handlerPointNewFormClose = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
};

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();

  boardPresenter.createPoint(handlerPointNewFormClose);
  evt.target.disabled = true;
});


Promise.all([
  api.getDestination(),
  api.getOffers(),
  api.getPoints()
])
  .then(([destinations, offers, points]) => {
    console.log(destinations);
    pointsModel.setAllDestinations(destinations)
    console.log(pointsModel.getAllDestinations());

    console.log(offers);
    pointsModel.setAllOffers(offers)
    console.log(pointsModel.getAllOffers());

    console.log(points);
    pointsModel.setPoints(UpdateType.INIT, points);
    console.log(pointsModel.getPoints());
    render(menuElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch((err) => {
    console.log(err)
    pointsModel.setPoints(UpdateType.INIT, []);
    render(menuElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
