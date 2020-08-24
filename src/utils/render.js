import {RenderPosition} from '../const.js';
import Abstract from "../view/abstract.js";

const getNodeElement = (element) => {
  return element instanceof Abstract ? element.getElement() : element;
};

export const render = (container, child, place) => {

  container = getNodeElement(container);
  child = getNodeElement(child);

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      container.append(child);
      break;
    case RenderPosition.AFTER_END:
      container.after(child);
      break;
    default:
      container.appendChild(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export const replace = (container, newChild, oldChild) => {
  oldChild = getNodeElement(oldChild);
  newChild = getNodeElement(newChild);

  if (container === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  container.replaceChild(newChild, oldChild);
};
