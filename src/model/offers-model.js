import {getAllOffers} from '../mock/offers.js';


export default class OffersModel {
  offers = getAllOffers();

  getOffers() {
    return this.offers;
  }
}
