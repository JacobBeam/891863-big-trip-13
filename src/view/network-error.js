import AbstractView from "./abstract.js";

const createNetworkErrorElement = () => `<div class="page-header__error">
<div class="page-header__error-text">Network connection error.</div>
<div class="page-header__error-text">You can't add and edit points.</div>
</div>`;


export default class NetworkError extends AbstractView {

  getTemplate() {
    return createNetworkErrorElement();
  }
}
