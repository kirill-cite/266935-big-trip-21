import {createElement} from '../render.js';
import { formatDate, formatTime, formatDuration } from '../utils.js';

function createPointViewTemplate(point, destinations, offers) {

  const {id, base_price, date_from, date_to, destination_id, is_favorite, offers_id, type} = point;

  return /*html*/`<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime=${date_from}>${formatDate(date_from)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type}
              ${getDestination(destination_id, destinations)}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time"
                  datetime=${date_from}>${formatTime(date_from)}</time>
                  —
                  <time class="event__end-time"
                  datetime=${date_to}">${formatTime(date_to)}</time>
                </p>
                <p class="event__duration">${formatDuration(date_from, date_to)}</p>
              </div>
              <p class="event__price">
                €&nbsp;<span class="event__price-value">${base_price}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${getOffersList(point.type, offers_id, offers).map((selectedOffer) => (selectedOffer ? /*html*/`
                <li class="event__offer">
                  <span
                  class="event__offer-title">
                  ${selectedOffer.title}
                  </span>
                  +€&nbsp;
                  <span
                  class="event__offer-price">
                  ${selectedOffer.price}
                  </span>
                </li>
                ` : ''))}
              </ul>
              <button class="event__favorite-btn event__favorite-btn--active" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
}

function getDestination(destination_id, destinations){
  return destinations.find((destination) => destination_id === destination.id).name;
}

function getOffersList(pointType, offers_id, offers){
  const offerGroup = offers.find((offer) => pointType === offer.type);
  console.log(offerGroup);
  const selectedOffers = offerGroup.offers.map((offer) => (offers_id.includes(offer.id) ? offer : ''));
  console.log(selectedOffers);
  return selectedOffers;
  /*`
  <li class="event__offer">
                    <span class="event__offer-title">Order Uber</span>
                    +€&nbsp;
                    <span class="event__offer-price">20</span>
                  </li>`*/
}

export default class PointView {
  constructor({point, destinations, offers}){
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createPointViewTemplate(this.point, this.destinations, this.offers);
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
