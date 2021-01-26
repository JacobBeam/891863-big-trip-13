import "./toast.css";

const SHOW_TIME = 5000;
const DIV_ELEMENT = `div`;
const CLASS_TOAST_CONTAINER = `toast-container`;
const CLASS_TOAST_ITEM = `toast-item`;

const toastContainer = document.createElement(DIV_ELEMENT);
toastContainer.classList.add(CLASS_TOAST_CONTAINER);
document.body.append(toastContainer);

const toast = (message) => {
  const toastItem = document.createElement(DIV_ELEMENT);
  toastItem.textContent = message;
  toastItem.classList.add(CLASS_TOAST_ITEM);

  toastContainer.append(toastItem);


  setTimeout(() => {
    toastItem.remove();
  }, SHOW_TIME);

};

export {toast};
