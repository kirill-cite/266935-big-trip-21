import BriefViewView from './view/brief-view.js';
import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import {RenderPosition, render} from './render.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripListContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

render(new BriefViewView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersElement);

const listPresenter = new ListPresenter({listContainer: tripListContainerElement,
  pointsModel});

listPresenter.init();
