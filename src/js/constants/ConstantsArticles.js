export default {
  root_class: 'root',
  header: {
    class: 'header',
    background: '#FFFFFF!important',
    box_shadow: 'inset 0px -1px 0px #D1D2D6!important',
    elements: {
      color: '#1A1B22',
      hidden_button_class: 'header__nav-button_hidden',
      login_button_class: 'header__nav-button_rectangle',
      saved_articles_button_class: 'header__nav-button_saved-articles',
      logout_icon_class: 'header__logout-icon',
      filter: 'none',
    },
    mobile_menu: {
      close_button_class: 'mobile-menu__close',
      nav_button_class: 'header__navigation',
    },
  },
  news: {
    news_place_class: 'news',
    news__card_delete_button_class: 'news__delete-button',
    news__card_tag_place_class: 'news__tags-place',
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
