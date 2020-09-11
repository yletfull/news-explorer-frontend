import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(data) {
    super();
    ({
      popupTemplate: this.popupTemplate,
      closeButton: this.closeButtonClass,
      entryButton: this.entryButtonClass,
      form: this.form,
      alterActionButton: this.alterActionButtonLink,
      popupOpen: this.popupOpenFunc,
      errorText: this.errorText,
      formValidator: this.formValidator,
      api: this.api,
      getformInstance: this.getformInstance,
      rootClass: this.rootClass,
    } = data);
    this.root = document.querySelector(`.${this.rootClass}`);
  }

  open() {
    this._setContent();
    this.closeButton = this.popupElement.querySelector(`.${this.closeButtonClass}`);
    this.entryButton = this.popupElement.querySelector(`.${this.entryButtonClass}`);
    this.form = this.popupElement.querySelector(`.${this.form}`);
    this.alterActionButton = this.popupElement.querySelector(`.${this.alterActionButtonLink}`);
    if (this.form) { this.formValidator(this.form); }
    this._setHandlers();
  }

  _getTemplate() {
    const template = document.createElement('div');
    template.classList.add('popup');
    template.insertAdjacentHTML('afterbegin', this.popupTemplate);
    return template;
  }

  _setHandlers() {
    if (this.closeButton) {
      super._setListeners([
        {
          element: this.closeButton,
          event: 'click',
          callback: (event) => { this._close(event); },
        }]);
    }
    if (this.entryButton) {
      super._setListeners([
        {
          element: this.entryButton,
          event: 'click',
          callback: (event) => { this._sendData(event); },
        }]);
    }
    if (this.alterActionButton) {
      super._setListeners([
        {
          element: this.alterActionButton,
          event: 'click',
          callback: () => { this._close(); this.popupOpenFunc(this.alterActionButton.dataset.popup); },
        }]);
    }
    if (this.closeButton) {
      super._setListeners([
        {
          element: document,
          event: 'click',
          callback: (event) => { if (event.target === this.popupElement) { this._close(event); } },
        }]);
    }
    if (this.popupElement) {
      super._setListeners([
        {
          element: document,
          event: 'keydown',
          callback: (event) => { if (event.key === 'Enter') { this.entryButton.click(); } },
        }]);
    }
    if (this.popupElement) {
      super._setListeners([
        {
          element: document,
          event: 'keydown',
          callback: (event) => { if (event.key === 'Escape') { this._close(event); } },
        }]);
    }
  }

  _close() {
    super._clearListener();
    this._clearContent();
  }

  _setContent() {
    this.popupElement = this._getTemplate();
    this.root.appendChild(this.popupElement);
  }

  _sendData(event) {
    event.preventDefault();
    const data = this.getformInstance().getInfo();
    const promise = new Promise((resolve, reject) => {
      const res = this.api[`${event.target.dataset.buttonAction}`](data);
      if (res) { resolve(res); } else { reject('Ошибка сервера'); }
    });
    promise.then((data) => {
      if (data === 'autorized') {
        window.location.reload();
      }
      if (data === 'registred') {
        this._close();
        this.popupOpenFunc('popup_success_registration');
      } else { this.getformInstance().setServerError(data.message); }
    })
      .catch((err) => this.getformInstance().setServerError(err.message));
  }

  _clearContent() {
    this.popupElement.parentNode.removeChild(this.popupElement);
    super._clearListener();
  }
}
