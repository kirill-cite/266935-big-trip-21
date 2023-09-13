import { getAllPoints } from '../mock/points.js';
import { getAllOffers } from '../mock/offers.js';
import { getAllDestinations } from '../mock/destinations.js';


export default class PointsModel {
  #points = getAllPoints();
  #destinations = getAllDestinations();
  #offers = getAllOffers();

  #convertedPoints = this.#points.map((point) => ({
    id: point.id,
    basePrice: point.base_price,
    dateFrom: point.date_from,
    dateTo: point.date_to,
    destinationId: point.destination_id,
    isFavorite: point.is_favorite,
    offerIds: point.offers_id,
    type: point.type
  }));

  #modeledPoints = this.#convertedPoints.map((point) => ({
    id: point.id,
    basePrice: point.basePrice,
    dateFrom: point.dateFrom,
    dateTo: point.dateTo,
    destinations: this.#destinations.map((destination) => ({
      id: destination.id,
      description: destination.description,
      name: destination.name,
      pictures: destination.pictures?.map((picture) => picture),
      isSelected: point.destinationId === destination.id
    })),
    isFavorite: point.isFavorite,
    offers: this.#offers?.find((offer) => offer.type === point.type).offers.map((offer) => ({
      id: offer.id,
      title: offer.title,
      price: offer.price,
      isSelected: point.offerIds.includes(offer.id)
    })),
    type: point.type
  }));

  get points() {
    return this.#modeledPoints;
  }
}
