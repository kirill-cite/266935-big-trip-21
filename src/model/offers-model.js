import {getAllOffers} from '../mock/offers.js';


export default class OffersModel {
  #offers = getAllOffers();

  get offers() {
    return this.#offers;
  }
}
