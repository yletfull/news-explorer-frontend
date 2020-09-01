const validator = require('validator');

export default class Form {
  constructor(data) {
    ({
      form: this.form,
      popupErrorClass: this.popupErrorClass,
      entryButtonClass: this.entryButtonClass,
      inputErrorClass: this.inputErrorClass,
    } = data);
    this._validateForm();
    this.setServerError = this.setServerError.bind(this);
    this._inputErrorOpen = this._inputErrorOpen.bind(this);
    this._inputErrorShow = this._inputErrorShow.bind(this);
  }

  setServerError() {
    this.form.querySelector(`.${this.popupErrorClass}`);
  }

  _inputErrorOpen(inputError) {
    inputError.classList.remove(`${this.inputErrorClass}_hidden`);
  }

  _inputErrorShow(inputError) {
    inputError.classList.add(`${this.inputErrorClass}_hidden`);
  }

  _validateInputElement(input, type) {
    if (type === 'email' && validator.isEmail(input.value)) {
      return true;
    } if (type === 'name' && input.value.length >= 2 && input.value.length <= 12) {
      return true;
    } if (type === 'password' && input.value.length >= 8 && input.value.length <= 32) {
      return true;
    }
    return false;
  }

  _validateForm() {
    let inputs = this.form.querySelectorAll('input');
    this.triggerCount = 0;
    this.currentInput = '';
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const inputErrors = this.form.querySelectorAll(`.${this.inputErrorClass}`);
      const entryButton = this.form.querySelector(`.${this.entryButtonClass}`);
      const { type } = inputs[i].dataset;
      input.addEventListener('input', () => {
        const isValid = this._validateInputElement(input, type);
        if (isValid) { this._inputErrorShow(inputErrors[i]); input.isValid = true; } else { this._inputErrorOpen(inputErrors[i]); input.isValid = false; }
        inputs = Array.from(inputs);
        if (inputs.every((input) => input.isValid === true)) { entryButton.classList.remove(`${this.entryButtonClass}_disable`); } else {
          entryButton.classList.add(`${this.entryButtonClass}_disable`);
        }
      });
    }
  }

  _clear() {

  }

  _getInfo() {

  }
}
