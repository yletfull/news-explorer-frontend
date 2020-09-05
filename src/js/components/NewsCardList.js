import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(data) {
    super();
    ({
      paceClass: this.paceClass,
      flagClass: this.flagClass,
      iconClass: this.iconClass,
      cardDescriptionsClass: this.cardDescriptionsClass,
      dateClass: this.dateClass,
      titleClass: this.titleClass,
      subtitleClass: this.subtitleClass,
      sourceClass: this.sourceClass,
      cardPlaceClass: this.cardPlaceClass,
      showMoreButtonClass: this.showMoreButtonClass,
      errorLoadingMessage: this.errorLoadingMessage,
      templates: this.templates,
      articleMaxOnPageSteep: this.articleMaxOnPage,
    } = data);
    this.cardRoot = document.querySelector(`.${this.paceClass}`);
    this.cardPlaceClear = this.cardPlaceClear.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.addCard = this.addCard.bind(this);
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
    this.articles = this.data.articles;
    this.cardRoot.insertAdjacentHTML('afterbegin', this._getTemplate('card_place'));
    this.cardPlace = this.cardRoot.querySelector(`.${this.cardPlaceClass}`);
    this.showMoreButton = this.cardRoot.querySelector(`.${this.showMoreButtonClass}`);
    this._startRender();
    this._setHandlers();
  }

  _startRender() {this.articles.forEach((article, index) => {
    if (index < this.articleMaxOnPage) {
      this.cardPlace.insertAdjacentHTML('beforeend', this._getTemplate('card'));
      this.card = this.cardPlace.lastElementChild;
      this.cardIcon = this.card.querySelector(`.${this.iconClass}`);
      this.flagIcon = this.card.querySelector(`.${this.flagClass}`);
      this.cardDescriptions = this.card.querySelector(`.${this.cardDescriptionsClass}`);
      this.cardDate = this.card.querySelector(`.${this.dateClass}`);
      this.cardTitle = this.card.querySelector(`.${this.titleClass}`);
      this.cardSubTitle = this.card.querySelector(`.${this.subtitleClass}`);
      this.cardSource = this.card.querySelector(`.${this.sourceClass}`);
      this.cardIcon.setAttribute('src', article.urlToImage);
      this.cardIcon.setAttribute('alt', article.title);
      this.cardDate.textContent = article.publishedAt;
      this. cardTitle.textContent = article.title;
      this.cardSubTitle.textContent = article.description;
      this.cardSource.textContent = article.source.name;
      this. cardSource.setAttribute('href', article.url);
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

  addCard(card) {

  }

  _getTemplate(templateName) {
    return this.templates.news[templateName];
  }
}
