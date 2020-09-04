export default {
  root_class: 'root',
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
    popup_class: 'popup',
    open_buttons: document.querySelectorAll('#popup-open-button'),
    close_button_class: 'popup__close',
    entry_button_class: 'popup__button_entry',
    form_class: 'popup__form',
    popup_alter_action_link_class: 'popup__alter-action_link',
    popup_error_text_class: 'popup__error',
  },
  form: {
    popup_eror_class: 'popup__error',
    entry_button_class: 'popup__button',
    input_error_class: 'popup__input-error',
  },
  news: {
    news_place_class: 'news',
    news_card_flag_class: 'news__flag',
    news_card_icon_class: 'news__card-icon',
    news_card_date_class: 'news__date',
    news_card_title_class: 'news__card-title',
    news_card_subtitle_class: 'news__card-subtitle',
    news_card_source_class: 'news__source',
    news_button_show_more_class: 'news__button',
  },
};
