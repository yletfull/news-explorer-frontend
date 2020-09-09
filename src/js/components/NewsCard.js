import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(data) {
    super();
    ({
      addArticle: this.addArticle,
      removeArticle: this.removeArticle,
      newsHelpFieldClass: this.newsHelpFieldClass,
      flagClass: this.flagClass,
      flagActiveClass: this.flagActiveClass,
      iconClass: this.iconClass,
      cardDescriptionsClass: this.cardDescriptionsClass,
      dateClass: this.dateClass,
      titleClass: this.titleClass,
      subtitleClass: this.subtitleClass,
      sourceClass: this.sourceClass,
      cardPlaceClass: this.cardPlaceClass,
      templates: this.templates,
      isLoggedIn: this.isLoggedIn,
      notFoundUrl: this.notFoundUrl,
    } = data);
    this.isAdd = false;
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
    this.newsHelpField = this.card.querySelector(`.${this.newsHelpFieldClass}`);

    this.cardIcon.setAttribute('src', article.urlToImage);
    this.cardIcon.onerror = () => this.cardIcon.setAttribute('src', `${this.notFoundUrl}`);
    this.cardIcon.setAttribute('alt', article.title);
    this.cardDate.textContent = article.publishedAt;
    this.cardTitle.textContent = article.title;
    this.cardSubTitle.textContent = article.description;
    this.cardSource.textContent = article.source.name;
    this.url = article.url;
    this.cardSource.setAttribute('href', this.url);

    this._setHandlers();
    return this.card;
  }

  _getTemplate(templateName) {
    return this.templates.news[templateName];
  }

  _setHandlers() {
    super._setListeners([
      {
        element: this.cardIcon,
        event: 'click',
        callback: () => { document.location.href = this.url; },
      },
    ]);
    if (this.isLoggedIn && !this.isAdd && this.addArticle) {
      super._setListeners([
        {
          element: this.flagIcon,
          event: 'click',
          callback: () => {
            if (this.isLoggedIn && !this.isAdd) {
              this.addArticle(this.article).then((data) => { this.article._id = data; this.flagIcon.classList.add(`${this.flagActiveClass}`); this.isAdd = true; });
            }
            if (this.isLoggedIn && this.isAdd) { this.removeArticle(this.article._id).then(() => { this.flagIcon.classList.remove(`${this.flagActiveClass}`); this.isAdd = false; }); }
          },
        },
      ]);
    } if (this.isLoggedIn) {
      super._setListeners([
        {
          element: this.flagIcon,
          event: 'mouseover',
          callback: () => { this.flagIcon.classList.add(`${this.flagClass}_hover`); },
        },
      ]);
    } if (this.isLoggedIn) {
      super._setListeners([
        {
          element: this.flagIcon,
          event: 'mouseout',
          callback: () => { this.flagIcon.classList.remove(`${this.flagClass}_hover`); },
        },
      ]);
    }

    if (!this.isLoggedIn) {
      super._setListeners([
        {
          element: this.flagIcon,
          event: 'mouseover',
          callback: () => { this.newsHelpField.classList.remove(`${this.newsHelpFieldClass}_show`); },
        },
      ]);
    }
    if (!this.isLoggedIn) {
      super._setListeners([
        {
          element: this.flagIcon,
          event: 'mouseout',
          callback: () => { this.newsHelpField.classList.add(`${this.newsHelpFieldClass}_show`); },
        },
      ]);
    }
  }
}
