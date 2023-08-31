import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  pointsListComponent = new PointsListView();

  constructor({boardContainer, pointsModel, destinationsModel, offersModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.points];
    this.listDestinations = [...this.destinationsModel.destinations];
    this.listOffers = [...this.offersModel.offers];

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.element);
    render(this.pointsListComponent, this.boardComponent.element);
    render(new PointEditView({point : this.listPoints[0],
      destinations: this.listDestinations,
      offers: this.listOffers}), this.pointsListComponent.element);

    for (let i = 1; i < this.listPoints.length; i++) {
      render(new PointView({point : this.listPoints[i],
        destinations: this.listDestinations,
        offers: this.listOffers}),
      this.pointsListComponent.element);
    }

  }
}
