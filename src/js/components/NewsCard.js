import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(data) {
    super();
    ({
      flagClass: this.flagClass,
      iconClass: this.iconClass,
      cardDescriptionsClass: this.cardDescriptionsClass,
      dateClass: this.dateClass,
      titleClass: this.titleClass,
      subtitleClass: this.subtitleClass,
      sourceClass: this.sourceClass,
      cardPlaceClass: this.cardPlaceClass,
      templates: this.templates,
    } = data);
  }

  _renderIcon() {

  }

  cardRender(article) {
    this.article = article;
    this.card = document.createElement('div');
    this.card.classList.add('news__card');
    this.cardTemplate = this._getTemplate('card');
    this.card.insertAdjacentHTML('beforeend', this.cardTemplate);
    
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
    this.cardTitle.textContent = article.title;
    this.cardSubTitle.textContent = article.description;
    this.cardSource.textContent = article.source.name;
    this.url = article.url;
    this._setHandlers();
    return this.card;
  }

  _getTemplate(templateName) {
    return this.templates.news[templateName];
  }

  _setHandlers() {
    super._setListeners([
      {
        element: this.card,
        event: 'click',
        callback: () => { document.location.href = this.url; },
      },
    ]);
  }
}
