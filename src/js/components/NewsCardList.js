import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(data) {
    super();
    ({
      placeClass: this.placeClass,
      cardPlaceClass: this.cardPlaceClass,
      showMoreButtonClass: this.showMoreButtonClass,
      errorLoadingMessage: this.errorLoadingMessage,
      articleMaxOnPageSteep: this.articleMaxOnPage,
      cardRender: this.cardRender,
      keywords: this.keywords,
      cardPlaceTemplate: this.cardPlaceTemplate,
      loadCardsTemplate: this.loadCardsTemplate,
      notFoundCardsTemplate: this.notFoundCardsTemplate,
    } = data);
    this.cardRoot = document.querySelector(`.${this.placeClass}`);
    this.cardPlaceClear = this.cardPlaceClear.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  renderResults(data) {
    this.cardPlaceClear();
    if (data) { this.data = data; this.keyword = data.keyword; this._renderCards(); } else { this._renderError(this.errorLoadingMessage); }
  }

  renderLoader() {
    this.cardRoot.insertAdjacentHTML('beforeend', this.loadCardsTemplate);
  }

  _renderCards() {
    this.currentArticleInd = 0;
    this.articles = this.data.articles;
    if (this.articles.length === 0) { this._renderError(); } else {
      this.cardRoot.insertAdjacentHTML('afterbegin', this.cardPlaceTemplate);
      this.cardPlace = this.cardRoot.querySelector(`.${this.cardPlaceClass}`);
      this.showMoreButton = this.cardRoot.querySelector(`.${this.showMoreButtonClass}`);
      this._startRender();
      this._setHandlers();
    }
  }

  _startRender() {
    while (this.currentArticleInd < this.articles.length && this.currentArticleInd < this.articleMaxOnPage) {
      this.article = this.articles[this.currentArticleInd];
      this.article.keyword = this.keyword;
      this.card = this.cardRender(this.article);
      this._addCard();
      this.currentArticleInd++;
    }
    if (this.currentArticleInd === this.articles.length) { this._showButton(); }
  }

  _showButton() {
    this.showMoreButton.classList.add(`${this.showMoreButtonClass}_hidden`);
  }

  _renderError(err) {
    this.cardRoot.insertAdjacentHTML('afterbegin', this.notFoundCardsTemplate);
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
    this.showMoreButton.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      alignToTop: 'false',
    });
    this.articleMaxOnPage += this.articleMaxOnPage;
    this._startRender();
  }

  _addCard() {
    this.cardPlace.appendChild(this.card);
  }

  _getTemplate(templateName) {
    return this.templates.news[templateName];
  }
}
