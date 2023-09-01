import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {
  const { type, count } = filter;

  return (/*html*/`
    <div
      class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}>
      <label
        class="trip-filters__filter-label"
        for="filter-${type}">
        ${type}
        ${count}
      </label>
    </div>
  `);
}

function createFilterViewTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return (
    /*html*/`
      <form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
      </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterViewTemplate(this.#filters);
  }


}
