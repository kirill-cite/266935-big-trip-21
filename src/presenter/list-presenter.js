import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  pointListComponent = new PointListView();

  constructor({listContainer, pointsModel, destinationsModel, offersModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];
    this.listDestinations = [...this.destinationsModel.getDestinations()];
    this.listOffers = [...this.offersModel.getOffers()];

    render(new SortView(), this.listContainer);
    render(this.pointListComponent, this.listContainer);
    render(new PointEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointView({point : this.listPoints[i],
        destinations: this.listDestinations,
        offers: this.listOffers}),
      this.pointListComponent.getElement());
    }

  }
}
