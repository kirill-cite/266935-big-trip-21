import { getAllDestinations } from '../mock/destinations.js';


export default class DestinationsModel {
  #destinations = getAllDestinations();

  get destinations() {
    return this.#destinations;
  }
}
