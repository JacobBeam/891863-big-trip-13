//  import TripInfoView from "./view/trip-info.js";
//  import TotalPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
//  import NewEventView from "./view/event-new.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatisticsView from "./view/ststistics.js";
//  import OptionsModel from "./model/options.js";
import {generateEventTrip} from "./view/mock.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {MenuItem, UpdateType, FilterType} from "./utils/utils.js"

const TRIP_COUNT = 15;

const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip);

const pointsModel = new PointsModel();
pointsModel.setPoints(trips);

const filterModel = new FilterModel();
//  const optionsModel= new OptionsModel()
//  optionsModel.setTasks(trips)


const tripInfoElement = document.querySelector(`.trip-main`);
const eventsContentElement = document.querySelector(`.trip-events`);
const menuElement = tripInfoElement.querySelector(`.trip-controls`);


const siteMenuComponent = new MenuView();
render(menuElement, siteMenuComponent, RenderPosition.BEFOREEND);


const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения

      //
      break;
    case MenuItem.TABLE:
      console.log(MenuItem.TABLE)
      boardPresenter.init();
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
console.log(MenuItem.STATISTICS)
boardPresenter.destroy()
//Сбросить сортировку
//filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

      // Скрыть доску
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const filterPresenter = new FilterPresenter(menuElement, filterModel);
const boardPresenter = new BoardPresenter(eventsContentElement, tripInfoElement, pointsModel, filterModel);

//  const tripInfoComponent=new TripInfoView(trips);

//  if (TRIP_COUNT > 0) {
//  render(tripInfoElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
//  render(tripInfoComponent, new TotalPriceView(trips), RenderPosition.BEFOREEND);
filterPresenter.init();


//boardPresenter.init();
render(eventsContentElement, new StatisticsView(pointsModel.getPoints()), RenderPosition.AFTER);



//  } else {
//  render(eventsContentElement, new EmptyEventListView(), RenderPosition.BEFOREEND);
//  }

const handlerPointNewFormClose = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
};

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();

  boardPresenter.createPoint(handlerPointNewFormClose);
evt.target.disabled=true
});
