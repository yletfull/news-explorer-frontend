import NewsCardList from "./NewsCardList";

export default class NewsCard extends NewsCardList {
  constructor() {
      super();
  }

  renderIcon() {

  }

  _startRender() {
    this.articles.forEach((article, index) => {
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
        this.cardTitle.textContent = article.title;
        this.cardSubTitle.textContent = article.description;
        this.cardSource.textContent = article.source.name;
        this.url = article.url;
        delete this.articles[index];
        this.articles = this.articles.filter((article) => article !== null);

        super._setListeners([
          {
            element: this.card,
            event: 'click',
            callback: () => { document.location.href = this.url; },
          },
        ]);
      }
    });
  }
}
