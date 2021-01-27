import {createElement} from "../utils/render.js";

const NAME_ANIMATION = `shake`;
const SHAKE_ANIMATION_TIME = `s`;
const SHAKE_ANIMATION_TIMEOUT = 600;
const SHAKE_ANIMATION_DURATION = 0.6;
const ERROR_INSTANTIATE_ABSTRACT = `Can't instantiate Abstract, only concrete one.`;
const ERROR_IMPLEMENT = `Abstract method not implemented: getTemplate`;
export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(ERROR_INSTANTIATE_ABSTRACT);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(ERROR_IMPLEMENT);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `${NAME_ANIMATION} ${SHAKE_ANIMATION_DURATION}${SHAKE_ANIMATION_TIME}`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      if (callback) {
        callback();
      }
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
