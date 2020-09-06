import BaseComponent from './BaseComponent';

export default class SearchNews extends BaseComponent {
  constructor(data) {
    super();
    ({
      buttonClass: this.buttonClass,
      inputClass: this.inputClass,
      getNews: this.getNews,
    } = data);
    this.setHandlers = this.setHandlers.bind(this);
    this.button = document.querySelector(`.${this.buttonClass}`);
    this.input = document.querySelector(`.${this.inputClass}`);
    this.errorText = 'Введен пустой запрос';
  }

  setHandlers() {
    super._setListeners([
      {
        element: document,
        event: 'keydown',
        callback: (event) => {
          if (event.key === 'Enter') { event.preventDefault(); if (this._validity()) { this.getNews(this.input.value); } }
        },
      },
      {
        element: this.button,
        event: 'click',
        callback: () => { if (this._validity()) { this.getNews(this.input.value); } },
      },
      {
        element: this.input,
        event: 'click',
        callback: () => { if (this.input.value === this.errorText) { this.input.value = ''; this.input.blur(); } },
      },

    ]);
  }

  _showError(error) {
    this.input.value = error;
  }

  _validity() {
    if (this.input.value === '' || this.input.value === this.errorText) { this._showError(this.errorText); return false; } return true;
  }
}
