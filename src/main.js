import TripInfoView from "./view/trip-info.js";
import TotalPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/trip-sort.js";
import EventsListView from "./view/trip-list.js";
//  import NewEventView from "./view/event-new.js";
import EventEditView from "./view/event-edit.js";
import EventItemView from "./view/event-item.js";
import EmptyEventListView from "./view/event-empty.js";
import {generateEventTrip} from "./view/mock.js";
import {render, RenderPosition} from "./view/utils.js";

const TRIP_COUNT = 15;
const sortTripsByDay = (a, b) => a.startDate - b.startDate;

const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip).sort(sortTripsByDay);

const tripMainElement = document.querySelector(`.trip-main`);
const mainContentElement = document.querySelector(`.trip-events`);

if (TRIP_COUNT > 0) {
  render(tripMainElement, new TripInfoView(trips).getElement(), RenderPosition.AFTERBEGIN);
  const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
  render(tripInfoElement, new TotalPriceView(trips).getElement(), RenderPosition.BEFOREEND);
  render(mainContentElement, new SortView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(mainContentElement, new EmptyEventListView().getElement(), RenderPosition.BEFOREEND);
}


const menuElement = tripMainElement.querySelector(`.trip-controls`);
render(menuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(menuElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

if (TRIP_COUNT > 0) {
  const eventsListComponent = new EventsListView();
  render(mainContentElement, eventsListComponent.getElement(), RenderPosition.BEFOREEND);

  const renderEvent = (eventListElement, trip) => {

    const eventComponent = new EventItemView(trip);
    const eventEditComponent = new EventEditView(trip);

    const replaceCardToForm = () => {
      eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
    };

    const replaceFormToCard = () => {
      eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
    };


    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < TRIP_COUNT; i++) {
    renderEvent(eventsListComponent.getElement(), trips[i]);
  }
}
