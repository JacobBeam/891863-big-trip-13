import Abstract from "../view/abstract.js";

const ERROR_REPLACE = `Can't replace unexisting elements`;
const ERROR_REMOVE = `Can remove only components`;

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
};

export const render = (container, child, place) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTER:
      container.after(child);
      break;
  }
};


export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(ERROR_REPLACE);
  }

  parent.replaceChild(newChild, oldChild);
};


export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(ERROR_REMOVE);
  }

  component.getElement().remove();
  component.removeElement();
};
