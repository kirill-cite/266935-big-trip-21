import {getAllPoints} from '../mock/points.js';


export default class PointsModel {
  points = Array.from(getAllPoints());

  getPoints() {
    return this.points;
  }
}
