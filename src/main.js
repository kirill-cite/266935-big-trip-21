import BriefViewView from './view/brief-view.js';
import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { RenderPosition, render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const boardContainerElement = document.querySelectorAll('.page-body__container');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

render(new BriefViewView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersElement);
render(new NewEventButtonView, tripMainElement, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter({boardContainer: boardContainerElement[1],
  pointsModel,
  destinationsModel,
  offersModel});

boardPresenter.init();
