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
import {render, RenderPosition, replace} from "./utils.js/render.js";


const TRIP_COUNT = 15;
const sortTripsByDay = (a, b) => a.startDate - b.startDate;

const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip).sort(sortTripsByDay);

const tripMainElement = document.querySelector(`.trip-main`);
const mainContentElement = document.querySelector(`.trip-events`);

if (TRIP_COUNT > 0) {
  render(tripMainElement, new TripInfoView(trips), RenderPosition.AFTERBEGIN);
  const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
  render(tripInfoElement, new TotalPriceView(trips), RenderPosition.BEFOREEND);
  render(mainContentElement, new SortView(), RenderPosition.BEFOREEND);
} else {
  render(mainContentElement, new EmptyEventListView(), RenderPosition.BEFOREEND);
}


const menuElement = tripMainElement.querySelector(`.trip-controls`);
render(menuElement, new MenuView(), RenderPosition.BEFOREEND);
render(menuElement, new FilterView(), RenderPosition.BEFOREEND);

if (TRIP_COUNT > 0) {

  const eventsListComponent = new EventsListView();
  render(mainContentElement, eventsListComponent, RenderPosition.BEFOREEND);


  const renderEvent = (eventListElement, trip) => {

    const eventComponent = new EventItemView(trip);
    const eventEditComponent = new EventEditView(trip);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setEditCloseClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < TRIP_COUNT; i++) {
    renderEvent(eventsListComponent.getElement(), trips[i]);
  }
}
