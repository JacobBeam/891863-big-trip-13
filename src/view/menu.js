import AbstractView from "./abstract.js";
import {MenuItem} from "../utils/utils.js";

const CLICK_EVENT = `click`;
const ELEMENT_A = `A`;
const CLASS_BTN_ACTIVE = `trip-tabs__btn--active`;
const SELECTOR_DATA_BTN = `data-btn`;

const createMenuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
  <h2 class="visually-hidden">Switch trip view</h2>
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-btn="${MenuItem.TABLE}" >Table</a>
  <a class="trip-tabs__btn " href="#" data-btn="${MenuItem.STATISTICS}">Stats</a>
 </nav>`;
export default class Menu extends AbstractView {

  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }


  setMenuItem(menuItem) {
    const menuTable = this.getElement().querySelector(`[${SELECTOR_DATA_BTN}=${MenuItem.TABLE}]`);
    const menuStatistics = this.getElement().querySelector(`[${SELECTOR_DATA_BTN}=${MenuItem.STATISTICS}]`);

    switch (menuItem) {
      case MenuItem.TABLE:
        menuStatistics.classList.remove(CLASS_BTN_ACTIVE);
        menuTable.classList.add(CLASS_BTN_ACTIVE);


        break;
      case MenuItem.STATISTICS:
        menuTable.classList.remove(CLASS_BTN_ACTIVE);
        menuStatistics.classList.add(CLASS_BTN_ACTIVE);
        break;
    }
  }

  _menuClickHandler(evt) {

    if (evt.target.tagName !== ELEMENT_A) {
      return;
    }
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.btn);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(CLICK_EVENT, this._menuClickHandler);
  }
}
