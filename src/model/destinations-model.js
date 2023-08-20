import { getAllDestinations } from '../mock/destinations.js';


export default class DestinationsModel {
  destinations = getAllDestinations();

  getOffers() {
    return this.offers;
  }
}
