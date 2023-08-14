import View from './view.js';
import {html, getYear, getMonthName, getMonthNumber, getDate, getHoursString, getMinutesString, getDuration} from '../utilities.js';

/**
 *@typedef {import('./list-view').ItemState} State
 *
 *@extends {View<State>}
 */

class CardView extends View {
  constructor() {
    super();

    // this.classList.add('class1', 'class2');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <div class = "event">
        ${this.createStartDateHtml()}
        ${this.createTypeIconHtml()}
        ${this.createDestinationHtml()}
        ${this.createScheduleHtml()}
        ${this.createPriceHtml()}
        ${this.createOfferListHtml()}
        ${this.createFavoriteButtonHtml()}
        ${this.createOpenButtonHtml()}
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createStartDateHtml() {
    const {dateFrom} = this.state;
    return html`
      <time
        class="event__date"
        datetime="${getYear(dateFrom)}-${getMonthNumber(dateFrom)}-${getDate(dateFrom)}">
        ${getMonthName(dateFrom)} ${getDate(dateFrom)}
      </time>
    `;
  }

  /**
   * @returns {string}
   */
  createTypeIconHtml() {

    const {types} = this.state;

    return html`
      <div class="event__type">
        <img
          class="event__type-icon"
          width="42"
          height="42"
          src="img/icons/${types.find((type) => type.isSelected).value}.png"
          alt="Event type icon">
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createDestinationHtml() {

    const {types, destinations} = this.state;

    return html`
      <h3
        class="event__title">
        ${types.find((type) => type.isSelected).value}
        ${destinations.find((destination) => destination.isSelected).name}
      </h3>
    `;
  }

  /**
   * @returns {string}
   */
  createScheduleHtml() {

    const {dateFrom, dateTo} = this.state;

    return html`
      <div class="event__schedule">
        <p class="event__time">
          <time
            class="event__start-time"
            datetime="${dateFrom}">
            ${getHoursString(dateFrom)}:${getMinutesString(dateFrom)}
          </time>
          —
          <time
            class="event__end-time"
            datetime="${dateTo}">
            ${getHoursString(dateTo)}:${getMinutesString(dateTo)}
          </time>
        </p>
        <p
          class="event__duration">
          ${getDuration(dateFrom, dateTo)}
        </p>
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createPriceHtml() {

    const {basePrice} = this.state;

    return html`
      <p class="event__price">
        €&nbsp;<span
        class="event__price-value">
        ${basePrice}
        </span>
      </p>
    `;
  }

  /**
   * @returns {string}
   */
  createOfferListHtml() {

    const {offers} = this.state;

    return html`
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">

        ${offers.map((offer) => offer.isSelected ? html`
          <li class="event__offer">
            <span
            class="event__offer-title">
            ${offer.title}
            </span>
            +€&nbsp;
            <span
            class="event__offer-price">
            ${offer.price}
            </span>
          </li>
        ` : '')}

      </ul>
    `;
  }

  /**
   * @returns {string}
   */
  createFavoriteButtonHtml() {

    const {isFavorite} = this.state;

    return html`
      <button
        class="event__favorite-btn event__favorite-btn${isFavorite ? '--active' : ''}"
        type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
      </button>
    `;
  }

  /**
   * @returns {string}
   */
  createOpenButtonHtml() {
    return html`
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    `;
  }
}

customElements.define('card-view', CardView);

export default CardView;
