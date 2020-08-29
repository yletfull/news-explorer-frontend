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
    this.inputErrorOpen = this.inputErrorOpen.bind(this);
    this.inputErrorShow = this.inputErrorShow.bind(this);
  }

  setServerError() {
    this.form.querySelector(`.${this.popupErrorClass}`);
  }

  inputErrorOpen(inputError) {
    inputError.classList.remove(`${this.inputErrorClass}_hidden`);
    this.validCount++;
  }

  inputErrorShow(inputError) {
    inputError.classList.add(`${this.inputErrorClass}_hidden`);
  }

  _validateInputElement(input, type, inputError) {
    if (type === 'email' && validator.isEmail(input.value)) {
      return this.inputErrorShow(inputError);
    } if (type === 'name' && input.value.length >= 1 && input.value.length <= 12) {
      return this.inputErrorShow(inputError);
    } if (type === 'password' && input.value.length >= 8 && input.value.length <= 32) {
      return this.inputErrorShow(inputError);
    }
    this.inputErrorOpen(inputError);
  }

  _validateForm() {
    const inputs = this.form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      const inputErrors = this.form.querySelectorAll(`.${this.inputErrorClass}`);
      const entryButton = this.form.querySelector(`.${this.entryButtonClass}`);
      const { type } = inputs[i].dataset;
      this.triggerCount = 0;
      this.currentInput;
      inputs[i].addEventListener('input', () => {
        if (this.currentInput !== inputs[i]) { this.currentInput = inputs[i]; this.triggerCount++; }
        this._validateInputElement(inputs[i], type, inputErrors[i]);
        const hiddenInputErrors = this.form.querySelectorAll(`.${this.inputErrorClass}_hidden`);
        console.log(this.triggerCount);
        if (inputErrors.length === hiddenInputErrors.length && inputErrors.length === this.triggerCount) {
          entryButton.classList.remove(`${this.entryButtonClass}_disable`);
        } else {
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
