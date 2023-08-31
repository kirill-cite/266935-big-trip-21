import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/edit-point-view.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #boardComponent = new BoardView();
  #pointsListComponent = new PointsListView();

  #boardPoints = [];
  #boardDestinations = [];
  #boardOffers = [];

  constructor({boardContainer, pointsModel, destinationsModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardDestinations = [...this.#destinationsModel.destinations];
    this.#boardOffers = [...this.#offersModel.offers];

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#pointsListComponent, this.#boardComponent.element);
    render(new PointEditView({point : this.#boardPoints[0],
      destinations: this.#boardDestinations,
      offers: this.#boardOffers}), this.#pointsListComponent.element);

    for (let i = 1; i < this.#boardPoints.length; i++) {
      render(new PointView({point : this.#boardPoints[i],
        destinations: this.#boardDestinations,
        offers: this.#boardOffers}),
      this.#pointsListComponent.element);
    }
  }
}
