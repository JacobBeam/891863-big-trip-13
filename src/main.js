import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripPriceTemplate} from "./view/trip-price.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/trip-sort.js";
import {createTripListTemplate} from "./view/trip-list.js";
import {createNewTripTemplate} from "./view/event-new.js";
import {createEditTripTemplate} from "./view/event-edit.js";
import {createTripItemTemplate} from "./view/event-item.js";

const TRIP_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
render(tripInfoElement, createTripPriceTemplate(), `beforeend`);


const menuElement = tripMainElement.querySelector(`.trip-controls`);
render(menuElement, createMenuTemplate(), `beforeend`);
render(menuElement, createFilterTemplate(), `beforeend`);


const mainContentElement = document.querySelector(`.trip-events`);

render(mainContentElement, createSortTemplate(), `beforeend`);
render(mainContentElement, createTripListTemplate(), `beforeend`);

const tripListElement = mainContentElement.querySelector(`.trip-events__list`);
render(tripListElement, createNewTripTemplate(), `afterbegin`);


render(tripListElement, createEditTripTemplate(), `beforeend`);

for (let i = 0; i < TRIP_COUNT; i++) {
  render(tripListElement, createTripItemTemplate(), `beforeend`);
}
