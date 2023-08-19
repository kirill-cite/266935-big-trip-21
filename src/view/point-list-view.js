import {createElement} from '../render.js';

function createPointListViewTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class SortView {
  getTemplate() {
    return createPointListViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
