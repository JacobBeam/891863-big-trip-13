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
import {MenuItem} from "./utils/utils.js";

const TRIP_COUNT = 25;

const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip);

const pointsModel = new PointsModel();
pointsModel.setPoints(trips);

const filterModel = new FilterModel();
//  const optionsModel= new OptionsModel()
//  optionsModel.setTasks(trips)


const tripInfoElement = document.querySelector(`.trip-main`);
const eventsContentElement = document.querySelector(`.trip-events`);
const menuElement = tripInfoElement.querySelector(`.trip-controls`);


let siteMenuComponent = new MenuView();
render(menuElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(menuElement, filterModel);
const boardPresenter = new BoardPresenter(eventsContentElement, tripInfoElement, pointsModel, filterModel);

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

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const handlerPointNewFormClose = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
};

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();

  boardPresenter.createPoint(handlerPointNewFormClose);
  evt.target.disabled = true;
});
