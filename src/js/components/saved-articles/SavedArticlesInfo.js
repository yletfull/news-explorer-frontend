export default class SavedArticlesInfo {
  constructor(data) {
    ({
      savedArticlesSubtitleClass: this.savedArticlesSubtitleClass,
      savedArticlesKeywordsClass: this.savedArticlesKeywordsClass,
    } = data);
    this.savedArticlesKeywords = document.querySelector(`.${this.savedArticlesKeywordsClass}`);
    this.savedArticlesSubtitle = document.querySelector(`.${this.savedArticlesSubtitleClass}`);
  }

  render(data) {
    this.savedArticlesKeywords.textContent = 'По ключевым словам: ';
    ({
      keywords: this.keywords,
      userName: this.userName,
      hideCardList: this.hideCardList = ()=>{},
    } = data);
    if (this.keywords.length === 0) {
      this.resultSubtitleText = `${this.userName}, у вас нет сохранённых статей`;
      this._setSubtitleText();
      this.savedArticlesKeywords.style.display = 'none';
      this.hideCardList();
      return false;
    }
    this.resultSubtitleText = `${this.userName}, у вас ${this.keywords.length} сохранённых статей`;
    this._setSubtitleText();
    this.keywords = this._keywordsSort();
    this.keywords.forEach((keyword, index) => {
      const keywordTemplate = this._createKeywordTemplate({ keyword, index, length: this.keywords.length });
      if (keywordTemplate) this.savedArticlesKeywords.insertAdjacentHTML('beforeend', keywordTemplate);
    });
    return true;
  }

  _setSubtitleText() {
    this.savedArticlesSubtitle.textContent = this.resultSubtitleText;
  }

  _createKeywordTemplate(data) {
    const { keyword, length, index } = data;
    if (length > 3) {
      if (index < 2) {
        return `<b>${keyword}</b>, `;
      }
      if (index === 2) {
        return `и <b>${length - 1 - index} другим</b>`;
      }
    }

    if (length === 3) {
      if (index < 2) {
        return `<b>${keyword}</b>, `;
      }
      if (index === 2) {
        return `<b>и ${keyword}</b>`;
      }
    }

    if (length === 2) {
      if (index === 0) {
        return `<b>${keyword}</b> и `;
      }
      return `<b>${keyword}</b> `;
    }

    if (length === 1) {
      return `<b>${keyword}</b>`;
    }

    return false;
  }

  _keywordsSort() {
    const counts = [];
    let result = [];
    this.keywords.forEach((keyword) => { counts[keyword] = (counts[keyword] || 0) + 1; });
    for (const key in counts) {
      if (key) { result.push({ key, value: counts[key] }); }
    }
    result.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });
    result = result.map((el) => el.key);
    return result;
  }
}
