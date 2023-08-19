import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  pointListComponent = new PointListView();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getElement()];

    render(new SortView(), this.listContainer);
    render(this.pointListComponent, this.listContainer);
    render(new PointEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointView({point : this.listPoints[i]}), this.pointListComponent.getElement());
    }

  }
}
