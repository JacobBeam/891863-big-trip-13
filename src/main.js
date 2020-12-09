import TripInfoView from "./view/trip-info.js";
import TotalPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
//  import NewEventView from "./view/event-new.js";
import EmptyEventListView from "./view/event-empty.js";
import {generateEventTrip} from "./view/mock.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/trip.js";

const TRIP_COUNT = 15;
const sortTripsByDay = (a, b) => a.startDate - b.startDate;

const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip).sort(sortTripsByDay);

const tripMainElement = document.querySelector(`.trip-main`);
const mainContentElement = document.querySelector(`.trip-events`);

if (TRIP_COUNT > 0) {
  render(tripMainElement, new TripInfoView(trips), RenderPosition.AFTERBEGIN);
  const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
  render(tripInfoElement, new TotalPriceView(trips), RenderPosition.BEFOREEND);
} else {
  render(mainContentElement, new EmptyEventListView(), RenderPosition.BEFOREEND);
}


const menuElement = tripMainElement.querySelector(`.trip-controls`);
render(menuElement, new MenuView(), RenderPosition.BEFOREEND);
render(menuElement, new FilterView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(mainContentElement)

if (TRIP_COUNT > 0) {
  boardPresenter.init(trips);
}
