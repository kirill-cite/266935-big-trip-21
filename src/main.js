import NewFilterView from './view/filtersView.js';
import {render} from './render.js';

const filtersElement = document.querySelector('.trip-controls__filters');


render(new NewFilterView(), filtersElement);
