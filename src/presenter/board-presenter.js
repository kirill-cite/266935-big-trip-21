import { render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointsListComponent = new PointsListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #boardPoints = [];
  #pointPresenters = new Map();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort() {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPointList() {
    render(this.#pointsListComponent, this.#boardComponent.element);
    this.#renderPoints();
  }

  #renderBoard(){
    render(this.#boardComponent, this.#boardContainer);

    if(this.#boardPoints.length === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
