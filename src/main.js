import NewFilterView from './view/filtersView.js';
import NewSortView from './view/sortView.js';
import {render} from './render.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const sortElement = document.querySelector('.trip-events');


render(new NewFilterView(), filtersElement);
render(new NewSortView(), sortElement);
