import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(data) {
    super();
    ({
      paceClass: this.paceClass,
      flagClass: this.flagClass,
      iconClass: this.iconClass,
      dateClass: this.dateClass,
      titleClass: this.titleClass,
      subtitleClass: this.subtitleClass,
      sourceClass: this.sourceClass,
      showMoreButtonClass: this.showMoreButtonClass,
      templates: this.templates,
    } = data);
    this.cardRoot = document.querySelector(`.${this.paceClass}`);
    this.cardPlaceClear = this.cardPlaceClear.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.showMore = this.showMore.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  renderResults(data) {
    // this.cardPlaceClear();
    data.then((data) => data? this._renderCards(data) : this._renderError())

  }

  renderLoader() {
    this.cardRoot.insertAdjacentHTML('afterbegin', this._getTemplate('load_card_place'));
  }

  _renderCards(data){
      console.log(data)
    const articles = data.articles;
    this.cardRoot.insertAdjacentHTML('afterbegin', this._getTemplate('card_place'));
    console.log(this.cardRoot)
    this.cardPlace = this.cardRoot.querySelector('.news__card-place');
    const showMoreButton = this.cardPlace.querySelector(`${this.showMoreButtonClass}`);
    articles.forEach((article,index) => {
        console.log(article)
        this.cardPlace.insertAdjacentHTML('afterbegin', this._getTemplate('card'));
        const cardIcon = this.cardPlace.querySelector(`.${this.iconClass}`);
        const flagIcon = this.cardPlace.querySelector(`.${this.flagClass}`);
        const cardDate = this.cardPlace.querySelector(`.${this.dateClass}`);
        const cardTitle = this.cardPlace.querySelector(`.${this.titleClass}`);
        const cardSubTitle = this.cardPlace.querySelector(`.${this.subtitleClass}`);
        const cardSource = this.cardPlace.querySelector(`.${this.sourceClass}`);
        cardIcon.setAttribute('src', article.urlToImage)
        cardDate.textContent = article.publishedAt;
        cardTitle.textContent = article.title;
        cardSubTitle.textContent = article.description;
        cardSource.textContent = article.source.name;
    });
    

  }


  _renderError() {
    this.cardRoot.insertAdjacentHTML('afterbegin', this._getTemplate('not_found_card_place'));
  }

  cardPlaceClear(){
    this.cardRoot.removeChild(this.cardRoot.firstChild);
  }

  showMore() {

  }

  addCard(card) {

  }

  _getTemplate(templateName) {
    return this.templates.news[templateName];
  }
}
