export default class Popup {
  constructor(data) {
    ({
      popupTemplate: this.popupTemplate,
      closeButton: this.closeButtonClass,
      entryButton: this.entryButtonClass,
      form: this.form,
      alterActionButton: this.alterActionButtonLink,
      popupListener: this.popupListener,
    } = data);
    this.root = document.querySelector('.root');
  }

  open() {
    this.setContent();
    this.closeButton = this.popupElement.querySelector(this.closeButtonClass);
    this.entryButton = this.popupElement.querySelector(this.entryButtonClass);
    this.form = this.popupElement.querySelector(this.form);
    this.alterActionButton = this.popupElement.querySelector(this.alterActionButtonLink);
    this.addEventListener();
  }

  getTemplate() {
    const template = document.createElement('div');
    template.classList.add('popup');
    template.insertAdjacentHTML('afterbegin', this.popupTemplate);
    return template;
  }

  addEventListener() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', (event) => {
        this.close(event);
      });
    }
    if (this.entryButton) {
      this.entryButton.addEventListener('click', (event) => {
        event.preventDefault();
      });
    }
    if (this.alterActionButton) {
      this.popupListener(this.alterActionButton);
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

  clearContent() {
    this.popupElement.parentNode.removeChild(this.popupElement);
  }
}
