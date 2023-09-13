import { render, RenderPosition, remove } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/point.js';
import { SortType } from '../const.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointsListComponent = new PointsListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();

  #boardPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    //сохраняем массив точек в исходном виде, так как sort меняет исходный массив
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortPointDay);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    //перерисовывает компонент SortView с выбранной сортировкой
    //this.#renderSort(this.#currentSortType);
    //выполняет сортировку
 
    this.#sortPoints(sortType);
    remove(this.#sortComponent);
    this.#renderSort(this.#currentSortType);
    // - Очищаем список
    this.#clearPointList();
    // - Рендерим список заново
    this.#renderPointList();
  };

  #renderSort(sortType) {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType: sortType
    });

    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
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

    this.#renderSort(this.#currentSortType);
    this.#renderPointList();
  }
}
