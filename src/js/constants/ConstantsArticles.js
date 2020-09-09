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
  news: {
    news_place_class: 'news',
    news_card_flag_class: 'news__flag',
    news_card_flag_active_class: 'news__flag_enable',
    news_help_field_class: 'news__help',
    news_card_flag_disable_class: 'news__flag',
    news_card_icon_class: 'news__card-icon',
    news_card_descriprions_class: 'news__card-description',
    news_card_date_class: 'news__date',
    news_card_place_class: 'news__card-place',
    news_card_title_class: 'news__card-title',
    news_card_subtitle_class: 'news__card-subtitle',
    news_card_source_class: 'news__source',
    news_button_show_more_class: 'news__button',
    news_error_loading_message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  },
  search_news: {
    button_class: 'search__button',
    input_class: 'search__input',
  },
  links: {
    news_not_found_icon_link: 'https://downloader.disk.yandex.ru/preview/70a2ec826946021705059720de575bcd81ae9fc7b8f9d46f671cfcba0d6302ea/5f5524ba/wvS0-PpvDeSPVqqKQptjPtGQ5fVboqM2yVvh9xQumefCZKdEv6q4GDyQ3uZSc1iF2ftC1_6lFntToqqfqsir3A==?uid=0&filename=NOT_FOUN_IMAGE.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&owner_uid=1133010978&size=2048x2048',
  },
  saved_articles: {
    subtitleClass: 'articles-info__subtitle',
    keywordsClass: 'articles-info__keywords',
  },
};
