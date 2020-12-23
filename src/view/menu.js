import AbstractView from "./abstract.js";
import {MenuItem} from "../utils/utils.js"

const createMenuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
  <h2 class="visually-hidden">Switch trip view</h2>
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-btn="${MenuItem.TABLE}" >Table</a>
  <a class="trip-tabs__btn" href="#" data-btn="${MenuItem.STATISTICS}">Stats</a>
 </nav>`;
export default class Menu extends AbstractView {

  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {

    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.btn);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-btn=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`)
    }
  }
}
