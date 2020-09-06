import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(data) {
    super();
    ({
      placeClass: this.placeClass,
      cardPlaceClass: this.cardPlaceClass,
      showMoreButtonClass: this.showMoreButtonClass,
      errorLoadingMessage: this.errorLoadingMessage,
      templates: this.templates,
      articleMaxOnPageSteep: this.articleMaxOnPage,
      cardRender: this.cardRender,
    } = data);
    this.cardRoot = document.querySelector(`.${this.placeClass}`);
    this.cardPlaceClear = this.cardPlaceClear.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  renderResults(data) {
    this.cardPlaceClear();
    data.then((data) => {
      if (data) { this.data = data; this._renderCards(); } else { this._renderError(this.errorLoadingMessage); }
    });
  }

  renderLoader() {
    this.cardRoot.insertAdjacentHTML('beforeend', this._getTemplate('load_card_place'));
  }

  _renderCards() {
    this.cardRoot.insertAdjacentHTML('afterbegin', this._getTemplate('card_place'));
    this.cardPlace = this.cardRoot.querySelector(`.${this.cardPlaceClass}`);
    this.articles = this.data.articles;
    this.showMoreButton = this.cardRoot.querySelector(`.${this.showMoreButtonClass}`);
    this._startRender();
    this._setHandlers();
  }

  _startRender() {
    this.articles.forEach((article, index) => {
      if (index < this.articleMaxOnPage) {
        this.card = this.cardRender(article);
        this._addCard();
        delete this.articles[index];
        this.articles = this.articles.filter((article) => article !== null);
      }
    });
  }

  _renderError(err) {
    this.cardRoot.insertAdjacentHTML('afterbegin', this._getTemplate('not_found_card_place'));
    const errElement = this.cardRoot.querySelector('.news__not-found-subtitle');
    errElement.textContent = err;
  }

  cardPlaceClear() {
    while (this.cardRoot.firstChild) {
      this.cardRoot.removeChild(this.cardRoot.firstChild);
    }
  }

  _setHandlers() {
    super._setListeners([
      {
        element: this.showMoreButton,
        event: 'click',
        callback: () => { this._showMore(); },
      },
    ]);
  }

  _showMore() {
    this._startRender();
  }

  _addCard() {
    this.cardPlace.appendChild(this.card);
  }

  _getTemplate(templateName) {
    return this.templates.news[templateName];
  }
}
