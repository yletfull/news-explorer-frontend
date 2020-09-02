export default {
  header: {
    obj: document.querySelector('header'),
    background: '#FFFFFF!important',
    boxShadow: 'inset 0px -1px 0px #D1D2D6!important',
    elements: {
      color: '#1A1B22',
      loginButton: document.querySelector('.header__nav-button_rectangle'),
      saved_articles_button: document.querySelector('.header__nav-button_saved-articles'),
      logoutIcon: document.querySelector('.header__logout-icon'),
      filter: 'none',
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
