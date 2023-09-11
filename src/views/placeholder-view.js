import View from './view.js';
import {html} from '../utilities.js';

class PlaceholderView extends View {
  constructor() {
    super();

    // this.classList.add('class1', 'class2');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <p class="trip-events__msg">Click New Event to create your first point</p>
    `;
  }
}

customElements.define('placeholder-view', PlaceholderView);

export default PlaceholderView;
