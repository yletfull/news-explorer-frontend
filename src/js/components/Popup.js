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
      headRender: this.headRender,
      // templates: this.templates
    } = data);
    this.root = document.querySelector('.root');
  }

  open() {
    this.setContent();
    this.closeButton = this.popupElement.querySelector(this.closeButtonClass);
    this.entryButton = this.popupElement.querySelector(this.entryButtonClass);
    this.form = this.popupElement.querySelector(this.form);
    this.alterActionButton = this.popupElement.querySelector(this.alterActionButtonLink);
    this.formValidator(this.form);
    this._setEventListener();
  }

  getTemplate() {
    const template = document.createElement('div');
    template.classList.add('popup');
    template.insertAdjacentHTML('afterbegin', this.popupTemplate);
    return template;
  }

  _setEventListener() {
    super._setListeners([
      {
        element: this.closeButton,
        event: 'click',
        callback: (event) => { this.close(event); },
      },
      {
        element: this.entryButton,
        event: 'click',
        callback: (event) => { this.sendData(event); },
      },
    ]);
    if (this.alterActionButton) {
      this.popupOpenFunc(this.alterActionButton);
      this.alterActionButton.addEventListener('click', () => {
        this.close();
      });
    }
  }

  close() {
    this.clearContent();
  }

  setContent() {
    this.popupElement = this.getTemplate();
    this.root.appendChild(this.popupElement);
  }

  sendData(event) {
    event.preventDefault();
    const data = this.getformInstance().getInfo();
    const promise = new Promise((resolve, reject) => {
     const res = this.api[`${event.target.dataset.buttonAction}`](data);
     res ? resolve(res) : reject('Ошибка сервера');
    })
    promise.then((data) => {
        if (data === 'autorized') { this.headRender(); this.close(); window.location.reload();}
        if (data === 'registred') { this.close(); } 
        else { this.getformInstance().setServerError(data.message) }
      })
      .catch((err) => this.getformInstance().setServerError(err.message))
  }

  clearContent() {
    this.popupElement.parentNode.removeChild(this.popupElement);
  }
}
