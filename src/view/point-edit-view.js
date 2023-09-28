import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatDateToISO } from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

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

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollUpClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = BLANK_POINT, onFormSubmit, onRollUpClick}){
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollUpClick = onRollUpClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointViewTemplate(this._state);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpHandler);
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input')
      .addEventListener('change', this.#eventDestinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#basePriceChangeHandler);
    this.element.querySelector('.event__section--offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.#setDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #rollUpHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpClick();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      offerGroups: this._state.offerGroups.map((offerGroup) => ({
        type: offerGroup.type,
        isSelected: offerGroup.type === evt.target.value,
        offers: offerGroup.offers.map((offer) => ({
          ...offer,
          isSelected: false
        }))
      })),
      types: this._state.types.map((type) => ({
        name: type.name,
        isSelected: type.name === evt.target.value
      })),
    });

  };

  #eventDestinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      destinations: this._state.destinations.map((destination) => ({
        ...destination,
        isSelected:  destination.name === evt.target.value
      }))
    });
  };

  #dateFromChangeHandler = ([userDateFrom]) => {
    this._setState({
      dateFrom: formatDateToISO(userDateFrom),
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this._setState({
      dateTo: formatDateToISO(userDateTo),
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: Number(evt.target.value)
    });

  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      offerGroups: this._state.offerGroups.map((offerGroup) => ({
        ...offerGroup,
        offers: offerGroup.offers.map((offer) => ({
          ...offer,
          isSelected: offer.id === evt.target.dataset.offerId ? !offer.isSelected : offer.isSelected
        }))
      })),
    });
  };

  #setDatepickers() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        'time_24hr': true,
        onClose: this.#dateFromChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        'time_24hr': true,
        onClose: this.#dateToChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}

function createEditPointViewTemplate(point) {
  const {basePrice, dateFrom, dateTo, destinations, offerGroups, types } = point;

  return /*html*/`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${getEventWrapper(types)}
          ${getDestinations(types, destinations)}
          ${getEventTime(dateFrom, dateTo)}
          ${getBasePrice(basePrice)}
          ${getSaveButton(dateFrom, dateTo)}
          ${getDeleteButton()}
          ${getEventRollupButton()}
        </header>
        <section class="event__details">
          ${getOffersList(offerGroups)}
          ${getDestinationDescription(destinations)}
        </section>
      </form>
   </li>`;
}

function getEventWrapper(types){
  return /*html*/`
    <div class="event__type-wrapper">
      <label
        class="event__type  event__type-btn"
        for="event-type-toggle-1">
        <span
          class="visually-hidden">
          Choose event type
        </span>
        <img
          class="event__type-icon"
          width="17"
          height="17"
          src="img/icons/${types.find((type) => type.isSelected).name}.png"
          alt="Event type icon">
      </label>
      <input
        class="event__type-toggle  visually-hidden"
        id="event-type-toggle-1"
        type="checkbox">
      <div
        class="event__type-list">
        <fieldset
          class="event__type-group">
          <legend
            class="visually-hidden">
            Event type
          </legend>
          ${getPointNamesString(types)}
        </fieldset>
      </div>
    </div>
  `;
}

function getPointNamesString(types) {
  const pointNames = types.map((type) => /*html*/`
    <div 
      class="event__type-item">
      <input 
        id="event-type-${type.name}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${type.name}"
        ${type.isSelected ? 'checked' : ''}>
      <label 
        class="event__type-label  event__type-label--${type.name}" 
        for="event-type-${type.name}-1">
        ${type.name[0].toUpperCase() + type.name.slice(1)}
      </label>
    </div>
  `);

  return pointNames.join('');
}

function getDestinations(types, destinations){
  return /*html*/`
  <div
    class="event__field-group  event__field-group--destination">
    <label
      class="event__label  event__type-output"
      for="event-destination-1">
      ${types.find((type) => type.isSelected).name}
    </label>
    <input
      class="event__input  event__input--destination"
      id="event-destination-1"
      type="text"
      name="event-destination"
      value=${destinations?.find((destination) => destination.isSelected).name}
      list="destination-list-1">
    <datalist
      id="destination-list-1">
      ${getDestinationsList(destinations)}
    </datalist>
  </div>
  `;
}

function getDestinationsList(destinations){
  const destinationNames = destinations?.map((destination) =>/*html*/`
  <option value="${destination.name}"></option>
  `);

  return destinationNames.join('');
}

function getEventTime(dateFrom, dateTo){
  return /*html*/`
    <div class="event__field-group  event__field-group--time">
      <label
        class="visually-hidden"
        for="event-start-time-1">
        From
      </label>
      <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time"
        value=${dateFrom}>
        —
      <label
        class="visually-hidden"
        for="event-end-time-1">
        To
      </label>
      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text"
        name="event-end-time"
        value=${dateTo}>
    </div>
  `;
}

function getBasePrice(basePrice){
  return /*html*/`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price"
        id="event-price-1" type="number" name="event-price"
        value=${basePrice}>
      </div>
  `;
}

function getSaveButton(){
  return /*html*/`
    <button
      class="event__save-btn  btn  btn--blue"
      type="submit">
      Save
    </button>
  `;
}

function getDeleteButton(){
  return /*html*/`
    <button class="event__reset-btn" type="reset">Delete</button>
  `;
}

function getEventRollupButton(){
  return /*html*/`
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `;
}

function getOffersList(offerGroups){
  const offerGroup = offerGroups.find((group) => group.isSelected === true);
  if (offerGroup.offers.length === 0){
    return '';
  }

  return /*html*/`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${getOffers(offerGroup.offers)}
      </div>
    </section>
  `;
}

function getOffers(offers){
  const offersStrings = offers?.map((offer) => /*html*/`
  <div 
    class="event__offer-selector">
    <input 
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${offer.title}-1" 
      type="checkbox" 
      name="event-offer-${offer.title}"
      data-offer-id = ${offer.id}
      ${offer.isSelected ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.title}-1">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`);

  return offersStrings.join('');
}

function getDestinationDescription(destinations){
  if (destinations.find((destination) => destination.isSelected).description === '') {
    return '';
  }

  return /*html*/`
  <section class="event__section  event__section--destination">
    ${getDestinationString(destinations)}
  </section>
  `;
}

function getDestinationString(destinations){
  const destination = destinations.find((destinationItem) => destinationItem.isSelected);

  const destinationString = /*html*/`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>`;

  if (destination.pictures.length === 0){
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

