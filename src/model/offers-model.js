import {getOffers} from '../mock/offers.js';


export default class OffersModel {
  offers = getOffers();

  getOffers() {
    return this.offers;
  }
}
