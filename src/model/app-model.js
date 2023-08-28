import { getAllDestinations } from '../mock/destinations.js';
import {getAllOffers} from '../mock/offers.js';
import {getAllPoints} from '../mock/points.js';

export default class AppModel{
  constructor(){
    this.points = [];
    this.destinations = [];
    this.offers = [];
  }

  setPoints(){
    this.points = getAllPoints();
  }

  setOffers(){
    this.offers = getAllOffers();
  }

  setDestinations(){
    this.destinations = getAllDestinations();
  }

  getPoints() {
    return this.points.map((point) => ({
      id: point.id,
      basePrice: point.base_price,
      dateFrom: point.date_to,
      dateTo: point.date_to,
      destinationId: point.destination_id,
      isFavorite: point.is_favorite,
      offerIds: point.offers_id,
      type: point.type
    }));
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

}
