import {getAllPoints} from '../mock/points.js';


export default class PointsModel {
  points = getAllPoints();

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
}
