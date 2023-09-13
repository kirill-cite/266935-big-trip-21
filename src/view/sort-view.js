import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, sortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = sortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortViewTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    if (evt.target.dataset.sortType === 'event' || evt.target.dataset.sortType === 'offers') {
      return;
    }

    evt.preventDefault();
    createSortViewTemplate(evt.target.dataset.sortType);
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}

function createSortViewTemplate(selectedSort) {
  return /*html*/`
          <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createSortList(selectedSort)}
          </form>`;
}

function createSortList(selectedSort) {
  const sortTypes = Object.values(SortType);
  const sortStrings = sortTypes.map((sortType) =>/*html*/`
  <div 
    class="trip-sort__item  trip-sort__item--${sortType}">
    <input 
      id="sort-${sortType}" 
      class="trip-sort__input  visually-hidden"
      type="radio" 
      name="trip-sort" 
      value="sort-${sortType}" 
      ${sortType === selectedSort ? 'checked' : ''}
      ${(sortType === 'event' || sortType === 'offers') ? 'disabled' : ''}>
    <label 
      class="trip-sort__btn" 
      for="sort-${sortType}" 
      data-sort-type="${sortType}">
      ${sortType}
    </label>
  </div>`);

  return sortStrings.join('');
}
