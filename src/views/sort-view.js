import View from './view.js';
import {html} from '../utilities.js';

class SortView extends View {
  constructor() {
    super();

    this.classList.add('trip-sort');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
    ${this.state.items.map((item) => (item.isDisabled ? '' :
    html`
      <div
        class="trip-sort__item  trip-sort__item--${item.value}">
        <input
          id="sort-day"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${item.value}"
          ${item.isSelected ? 'checked = true' : ''}>
        <label
          class="trip-sort__btn"
          for="sort-${item.value}">
          ${item.value}
        </label>
      </div>
      `
  ))}
    `;
  }
}

customElements.define('sort-view', SortView);

export default SortView;
