export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  _addListener(listener) {
    const { element, event, callback } = listener;
    element.addEventListener(event, callback);
  }

  _setListeners(listeners) {
    listeners.forEach((listener) => {
      this._addListener(listener);
    });
  }

  _clearListener() {
    this._listeners.forEach((listener) => {
      const { element, event, callback } = listener;
      element.removeEventListener(event, callback);
    });
  }
}
