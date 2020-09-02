export default {
  header: {
    obj: document.querySelector('header'),
    background: 'rgba(196, 196, 196, 0.01)',
    boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.2)',
    elements: {
      color: '#FFFFFF',
      saved_articles_button: document.querySelector('.header__nav-button_saved-articles'),
      loginButton: document.querySelector('.header__nav-button_rectangle'),
      logoutIcon: document.querySelector('.header__logout-icon'),
      filter: 'invert(100%)',
    },
  },
  popups: {
    popup: '.popup',
    open_buttons: document.querySelectorAll('#popup-open-button'),
    close_button: '.popup__close',
    entry_button: '.popup__button_entry',
    form: '.popup__form',
    popup_alter_action_link: '.popup__alter-action_link',
    error_error_text: '.popup__error',
  },
  form: {
    popup_eror_class: 'popup__error',
    entry_button_class: 'popup__button',
    input_error_class: 'popup__input-error',
  },
};
