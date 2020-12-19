//  import TripInfoView from "./view/trip-info.js";
//  import TotalPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
//  import NewEventView from "./view/event-new.js";
import EmptyEventListView from "./view/event-empty.js";
import PointsModel from "./model/points.js";
//import OptionsModel from "./model/options.js";
import {generateEventTrip} from "./view/mock.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/trip.js";

const TRIP_COUNT = 15;

const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip);

const pointsModel= new PointsModel()
pointsModel.setPoints(trips)


//const optionsModel= new OptionsModel()
//optionsModel.setTasks(trips)


const tripInfoElement = document.querySelector(`.trip-main`);
const eventsContentElement = document.querySelector(`.trip-events`);

const menuElement = tripInfoElement.querySelector(`.trip-controls`);
render(menuElement, new MenuView(), RenderPosition.BEFOREEND);
render(menuElement, new FilterView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(eventsContentElement, tripInfoElement, pointsModel);

//  const tripInfoComponent=new TripInfoView(trips);

//if (TRIP_COUNT > 0) {
  //  render(tripInfoElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
  //  render(tripInfoComponent, new TotalPriceView(trips), RenderPosition.BEFOREEND);
  boardPresenter.init();
//} else {
//  render(eventsContentElement, new EmptyEventListView(), RenderPosition.BEFOREEND);
//}
