import AbstractView from '../framework/view/abstract-view.js';

function createBoardViewTemplate() {
  return /*html*/`
  <section
    class="trip-events">
  <section>`;
}

export default class BoardView extends AbstractView {
  get template() {
    return createBoardViewTemplate();
  }

}
