import {createElement} from '../render.js';
import { formatDate, formatTime, formatDuration } from '../utils.js';

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

function createPointViewTemplate(point, destinations, offers) {

  const { basePrice, dateFrom, dateTo, destinationId, isFavorite, offerIds, type} = point;

  return /*html*/`<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime=${dateFrom}>${formatDate(dateFrom)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type}
              ${getDestination(destinationId, destinations)}</h3>
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
              <p class="event__price">
                €&nbsp;<span class="event__price-value">${basePrice}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${getOffersList(point.type, offerIds, offers)}

              </ul>
              <button
                class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}"
                type="button">
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

function getDestination(destinationId, destinations){
  return destinations.find((destination) => destinationId === destination.id).name;
}

function getOffersList(pointType, offerIds, offers){
  const offerGroup = offers.find((offer) => pointType === offer.type);
  const selectedOffers = offerGroup.offers.map((offer) => (offerIds.includes(offer.id) ? offer : ''));

  if (!selectedOffers.length){
    return '';
  }

  for (let i = 0; i < selectedOffers.length; i++){
    if (selectedOffers[i] === ''){
      selectedOffers.splice(i, 1);
      i--;
    }
  }

  const selectedOffersStrings = selectedOffers.map((selectedOffer) => /*html*/`<li class="event__offer">
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


