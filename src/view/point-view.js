import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, formatTime, formatDuration } from '../utils/point.js';

export default class PointView extends AbstractView {
  #point = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({point, onEditClick, onFavoriteClick}){
    super();

    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointViewTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

}

function createPointViewTemplate(point) {

  const { basePrice, dateFrom, dateTo, destinations, isFavorite, offerGroups, types } = point;

  return /*html*/`
    <li class="trip-events__item">
      <div class="event">
        ${getEventDate(dateFrom)}
        ${getEventIcon(types)}
        ${getEventTitle(types, destinations)}
        ${getSchedule(dateFrom, dateTo)}
        ${getPrice(basePrice)}
        ${getSelectedOffers(offerGroups)}
        ${getAddFavoriteButton(isFavorite)}
        ${getOpenEditButton()}
      </div>
    </li>`;
}

function getEventDate(dateFrom){
  return /*html*/`
  <time class="event__date" datetime=${dateFrom}>${formatDate(dateFrom)}</time>
  `;
}

function getEventIcon(types){
  return /*html*/`
  <div class="event__type">
    <img
      class="event__type-icon"
      width="42"
      height="42"
      src="img/icons/${types.find((type) => type.isSelected).name}.png"
      alt="Event type icon">
  </div>
  `;
}

function getEventTitle(types, destinations){
  return /*html*/`
  <h3 class="event__title">
    ${types.find((type) => type.isSelected).name}
    ${getDestination(destinations)}
  </h3>
  `;
}

function getDestination(destinations){
  return destinations?.find((destination) => destination.isSelected).name;
}

function getSchedule(dateFrom, dateTo){
  return /*html*/`
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time"
      datetime=${dateFrom}>${formatTime(dateFrom)}</time>
      —
      <time class="event__end-time"
      datetime=${dateTo}">${formatTime(dateTo)}</time>
    </p>
    <p class="event__duration">${formatDuration(dateFrom, dateTo)}</p>
  </div>
  `;
}

function getPrice(basePrice){
  return /*html*/`
  <p class="event__price">
    €&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  `;
}

function getSelectedOffers(offerGroups) { 
  return /*html*/`
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${getSelectedOfferGroup(offerGroups).map((offer) => offer.isSelected ? /*html*/
    `<li class="event__offer">
        <span
        class="event__offer-title">
        ${offer.title}
        </span>
        +€&nbsp;
        <span
        class="event__offer-price">
        ${offer.price}
        </span>
      </li>` : '')
    .join('')}
  </ul>
  `;
}

function getSelectedOfferGroup(offerGroups) {
  return offerGroups.find((offerGroup) => offerGroup.isSelected).offers;
}


function getAddFavoriteButton(isFavorite){
  return /*html*/`
  <button
    class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}"
    type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
    </svg>
  </button>
  `;
}

function getOpenEditButton(){
  return /*html*/`
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
  `;
}
