import {createElement} from '../render.js';

const BLANK_POINT = {
  id: 'ca080532-411e-4021-1234-93bb8b7ad7ea',
  basePrice: 0,
  dateFrom: '2023-08-12T21:00:00.740Z',
  dateTo: '2023-08-19T05:00:00.740Z',
  destinationId: 'c76f204e-e81a-43d8-af41-39523197812a',
  isFavorite: false,
  offerIds: [],
  type: 'ship'
};

export default class PointEditView {
  constructor({point = BLANK_POINT, destinations, offers}){
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createEditPointViewTemplate(this.point, this.destinations, this.offers);
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

function createEditPointViewTemplate(point, destinations, offers) {

  const {basePrice, dateFrom, dateTo, destinationId, offerIds, type} = point;

  return /*html*/`<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${getSelectedOffers(type, offers)}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${point.type}
                  </label>
                  <input class="event__input  event__input--destination"
                    id="event-destination-1" type="text" name="event-destination"
                    value=${destinations.find((destination) => destination.id === destinationId).name}
                    list="destination-list-1">
                  <datalist id="destination-list-1">
                    ${getDestinaniosString(destinations)}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label
                    class="visually-hidden"
                    for="event-start-time-1">
                    From
                    </label>
                  <input class="event__input  event__input--time"
                    id="event-start-time-1" type="text" name="event-start-time"
                    value=${dateFrom}>
                  —
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time"
                    id="event-end-time-1" type="text" name="event-end-time"
                    value=${dateTo}>
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    €
                  </label>
                  <input class="event__input  event__input--price"
                    id="event-price-1" type="text" name="event-price"
                    value=${basePrice}>
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${getOffers(type, offerIds, offers)}
                  </div>
                </section>
                <section class="event__section  event__section--destination">
                  ${getDestination(destinationId, destinations)}
                </section>
              </section>
            </form>
          </li>`;
}

function getDestinaniosString(destinations){
  const destinationNames = destinations.map((destination) =>/*html*/`
  <option value="${destination.name}"></option>
  `);

  return destinationNames.join('');
}

function getDestination(destinationId, destinations){
  const destination = destinations.find((destinationItem) => destinationId === destinationItem.id);

  const destinationString = /*html*/`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>`;

  if (destination.pictures === []){
    return destinationString;
  }

  const photosStrings = destination.pictures.map((picture) => /*html*/ `
      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
  `);

  const photosString = /*html*/`
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photosStrings.join('')}
    </div>
  </div>
  `;

  return destinationString + photosString;


}

function getOffers(pointType, offerIds, offers){
  const offersGroup = offers.find((offer) => pointType === offer.type);

  const offersStrings = offersGroup?.offers.map((offer) => /*html*/`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}"
      ${offerIds.includes(offer.id) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.title}-1">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`);

  return offersStrings.join('');
}

function getSelectedOffers(type, offers){
  const selectedOffers = offers.map((offer) => /*html*/ `
  <div
    class="event__type-item">
    <input
      id="event-type-${offer.type}-1"
      class="event__type-input  visually-hidden"
      type="radio"
      name="event-type"
      value="${offer.type}"
      ${type === offer.type ? 'checked' : ''}>
    <label
      class="event__type-label  event__type-label--${offer.type}"
      for="event-type-${offer.type}-1">
      ${offer.type[0].toUpperCase() + offer.type.slice(1)}
    </label>
  </div>`);

  return selectedOffers.join('');
}


