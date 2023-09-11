import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, formatTime, formatDuration } from '../utils/point.js';

export default class PointView extends AbstractView {
  #point = null;
  #handleEditClick = null;

  constructor({point, onEditClick}){
    super();

    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointViewTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

}

function createPointViewTemplate(point) {

  const { basePrice, dateFrom, dateTo, destinations, isFavorite, offers, type } = point;

  return /*html*/`
    <li class="trip-events__item">
      <div class="event">
        ${getEventDate(dateFrom)}
        ${getEventIcon(type)}
        ${getEventTitle(type, destinations)}
        ${getSchedule(dateFrom, dateTo)}
        ${getPrice(basePrice)}
        ${getSelectedOffers(point.type, offers)}
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

function getEventIcon(type){
  return /*html*/`
  <div class="event__type">
    <img
      class="event__type-icon"
      width="42"
      height="42"
      src="img/icons/${type}.png"
      alt="Event type icon">
  </div>
  `;
}

function getEventTitle(type, destinationId, destinations){
  return /*html*/`
  <h3 class="event__title">
    ${type}
    ${getDestination(destinationId, destinations)}
  </h3>
  `;
}

function getDestination(destinationId, destinations){
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

function getSelectedOffers(offers){
  return /*html*/`
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${getOffersList(offers)}
  </ul>
  `;
}

function getOffersList(offers){

  console.log(offers);
  const selectedOffersStrings = offers.map((selectedOffer) => /*html*/`<li class="event__offer">
    <span
    class="event__offer-title">
    ${selectedOffer.title}
    </span>
    +€&nbsp;
    <span
    class="event__offer-price">
    ${selectedOffer.price}
    </span>
  </li>`);

  return selectedOffersStrings.join('');
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
