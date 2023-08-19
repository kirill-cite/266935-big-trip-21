import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  pointListComponent = new PointListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortView(), this.listContainer);
    render(this.pointListComponent, this.listContainer);
    render(new PointEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }

  }
}
