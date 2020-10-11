import NewsCardList from '../NewsCardList';

export default class NewsCardListSavedArt extends NewsCardList {
  constructor(data) {
    super(data);
    ({
      rendersavedArticlesInfo: this.rendersavedArticlesInfo,
    } = data);
  }

  renderResults(data) {
    this.cardPlaceClear();
    if (data) {
      this.data = data;
      this.keywords = data.keywords;
      this.renderInfo = this.rendersavedArticlesInfo(this.keywords);
      if (!this.renderInfo) return;
      this._renderCards();
    } else { this._renderError(this.errorLoadingMessage); }
  }

  _startRender() {
    while (this.currentArticleInd < this.articles.length && this.currentArticleInd < this.articleMaxOnPage) {
      this.article = this.articles[this.currentArticleInd];
      this.article.keyword = this.keyword;
      this.article.allKeywords = this.keywords;
      this.article.reRender = this.rendersavedArticlesInfo;
      this.card = this.cardRender(this.article);
      this._addCard();
      this.currentArticleInd++;
    }
    if (this.currentArticleInd === this.articles.length) { this._showButton(); }
  }
}
