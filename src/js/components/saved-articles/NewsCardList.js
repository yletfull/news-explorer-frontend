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
}
