import BriefViewView from './view/brief-view.js';
import {RenderPosition, render} from './render.js';

const tripMainElement = document.querySelector('.trip-main');


render(new BriefViewView(), tripMainElement, RenderPosition.AFTERBEGIN);
