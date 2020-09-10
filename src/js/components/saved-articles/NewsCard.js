import NewsCard from '../NewsCard';

export default class SavedArticlesNewsCard extends NewsCard {
  constructor(data) {
    super(data);
    ({
      cardDeleteButtonClass: this.cardDeleteButtonClass,
      cardTagPlaceClass: this.cardTagPlaceClass,
      cardDeleteButtonActiveClass: this.cardDeleteButtonActiveClass,
      cardTemplate: this.cardTemplate,
    } = data);
  }

  cardRender(article) {
    this.article = article;
    this.card = document.createElement('div');
    this.card.classList.add(this.cardClass);
    this.card.insertAdjacentHTML('beforeend', this.cardTemplate);

    this.cardIcon = this.card.querySelector(`.${this.iconClass}`);
    this.cardDeleteButton = this.card.querySelector(`.${this.cardDeleteButtonClass}`);
    this.cardTagPlace = this.card.querySelector(`.${this.cardTagPlaceClass}`);
    this.cardDescriptions = this.card.querySelector(`.${this.cardDescriptionsClass}`);
    this.cardDate = this.card.querySelector(`.${this.dateClass}`);
    this.cardTitle = this.card.querySelector(`.${this.titleClass}`);
    this.cardSubTitle = this.card.querySelector(`.${this.subtitleClass}`);
    this.cardSource = this.card.querySelector(`.${this.sourceClass}`);
    this.newsHelpField = this.card.querySelector(`.${this.newsHelpFieldClass}`);

    this.cardIcon.setAttribute('src', article.urlToImage);
    this.cardIcon.onerror = () => this.cardIcon.setAttribute('src', `${this.notFoundUrl}`);
    this.cardIcon.setAttribute('alt', article.title);
    this.cardDate.textContent = this.dateConverter(article.publishedAt);
    this.cardTitle.textContent = article.title;
    this.cardSubTitle.textContent = article.description;
    this.cardSource.textContent = article.source.name;
    this.cardTagPlace.textContent = article.key;
    this.url = article.url;
    this.cardSource.setAttribute('href', this.url);

    this._setHandlers();
    return this.card;
  }

  _removeArticle() {
    this.card.parentNode.removeChild(this.card);
    super._clearListener();
  }

  _setHandlers() {
    super._setListeners([
      {
        element: this.cardIcon,
        event: 'click',
        callback: () => { document.location.href = this.url; },
      },
    ]);

    super._setListeners([
      {
        element: this.cardDeleteButton,
        event: 'click',
        callback: () => {
          this.removeArticle(this.article).then(() => { this._removeArticle(); });
        },
      },
    ]);

    super._setListeners([
      {
        element: this.cardDeleteButton,
        event: 'mouseover',
        callback: () => { this.cardDeleteButton.classList.add(`${this.cardDeleteButtonActiveClass}`); },
      },
    ]);

    super._setListeners([
      {
        element: this.cardDeleteButton,
        event: 'mouseout',
        callback: () => { this.cardDeleteButton.classList.remove(`${this.cardDeleteButtonActiveClass}`); },
      },
    ]);

    super._setListeners([
      {
        element: this.cardDeleteButton,
        event: 'mouseover',
        callback: () => { if (window.screen.width > 1250) this.newsHelpField.classList.remove(`${this.newsHelpFieldClass}_show`); },
      },
    ]);

    super._setListeners([
      {
        element: this.cardDeleteButton,
        event: 'mouseout',
        callback: () => { if (window.screen.width > 1250) this.newsHelpField.classList.add(`${this.newsHelpFieldClass}_show`); },
      },
    ]);
  }
}
