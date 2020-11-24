import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripPriceTemplate} from "./view/trip-price.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/trip-sort.js";
import {createTripListTemplate} from "./view/trip-list.js";
// import {createNewTripTemplate} from "./view/event-new.js";
import {createEditTripTemplate} from "./view/event-edit.js";
import {createTripItemTemplate} from "./view/event-item.js";
import {generateEventTrip} from "./view/mock.js";


const TRIP_COUNT = 15;
const sortTripsByDay = (a, b)=> a.startDate - b.startDate;
const trips = new Array(TRIP_COUNT).fill().map(generateEventTrip).sort(sortTripsByDay);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createTripInfoTemplate(trips), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
render(tripInfoElement, createTripPriceTemplate(trips), `beforeend`);


const menuElement = tripMainElement.querySelector(`.trip-controls`);
render(menuElement, createMenuTemplate(), `beforeend`);
render(menuElement, createFilterTemplate(), `beforeend`);


const mainContentElement = document.querySelector(`.trip-events`);

render(mainContentElement, createSortTemplate(), `beforeend`);
render(mainContentElement, createTripListTemplate(), `beforeend`);

const tripListElement = mainContentElement.querySelector(`.trip-events__list`);

render(tripListElement, createEditTripTemplate(trips[0]), `beforeend`);

for (let i = 1; i < TRIP_COUNT; i++) {
  render(tripListElement, createTripItemTemplate(trips[i]), `beforeend`);
}
