import BriefViewView from './view/brief-view.js';
import FilterView from './view/filter-view.js';
import {RenderPosition, render} from './render.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

render(new BriefViewView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersElement);
