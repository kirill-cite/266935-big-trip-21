import { getAllDestinations } from '../mock/destinations.js';


export default class DestinationsModel {
  destinations = getAllDestinations();

  getDestinations() {
    return this.destinations;
  }
}
