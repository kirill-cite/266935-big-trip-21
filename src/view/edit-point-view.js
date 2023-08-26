import {createElement} from '../render.js';

function createEditPointViewTemplate(point, destinations, offers) {

  const {id, base_price, date_from, date_to, destination_id, is_favorite, offers_id, type} = point;

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
                      ${getOffers(type, offers)}
                      <div class="event__type-item">
                        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                      </div>

                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${point.type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
                  <datalist id="destination-list-1">
                    <option value="Amsterdam"></option>
                    <option value="Geneva"></option>
                    <option value="Chamonix"></option>
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
                    value=${date_from}>
                  —
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time"
                    id="event-end-time-1" type="text" name="event-end-time"
                    value=${date_to}>
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    €
                  </label>
                  <input class="event__input  event__input--price"
                    id="event-price-1" type="text" name="event-price"
                    value=${base_price}>
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
                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
                      <label class="event__offer-label" for="event-offer-luggage-1">
                        <span class="event__offer-title">Add luggage</span>
                        +€&nbsp;
                        <span class="event__offer-price">50</span>
                      </label>
                    </div>

                  </div>
                </section>

                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
                </section>
              </section>
            </form>
          </li>`;
}

function getOffers(type, offers){
  const offerTypes = offers.map((offer) => /*html*/ `
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

  return offerTypes.join('');
}

export default class PointEditView {
  constructor({point, destinations, offers}){
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
