import '../css/main.css';

import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import constants from './constants/ConstantsMain';
import templates from './templates/Templates';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import NewsCardList from './components/NewsCardList';
import NewsCard from './components/NewsCard';
import SearchNews from './components/SearchNews';
import TimeFormat from './utils/timeFormat';
import HeaderMobile from './components/HeaderMobile';

const dateConverter = (date) => new TimeFormat(3).convertToRussian(date);

const serverData = {
  origin: process.env.BASE_URL,
  isAuth: !!localStorage.getItem('token'),
};

const api = new MainApi(serverData, true);

const addArticle = (article) => api.createArticle(article);
const removeArticle = (article) => api.removeArticle(article);

const newsApi = new NewsApi({
  differenceDays: -7,
  to: new Date(),
  pageSize: 100,
  url: 'https://nomoreparties.co/news',
  apiKey: 'af5e79492c924fd4bbd647c59c1521b5',

});

let formInstance;
const formValidator = (form) => {
  formInstance = new Form({
    form,
    popupErrorClass: constants.form.popup_eror_class,
    entryButtonClass: constants.form.entry_button_class,
    inputErrorClass: constants.form.input_error_class,
  });
};
const getformInstance = () => formInstance;

const popupOpen = (popupName) => {
  new Popup({
    popupTemplate: templates.popups[`${popupName}`],
    closeButton: constants.popups.close_button_class,
    entryButton: constants.popups.entry_button_class,
    rootClass: constants.root_class,
    alterActionButton: constants.popups.popup_alter_action_link_class,
    errorText: constants.popups.popup_error_text_class,
    form: constants.popups.form_class,
    api,
    templates,
    popupOpen,
    formValidator,
    getformInstance,
  }).open();
};

const popupOpenBtnListener = function (button) {
  if (!serverData.isAuth) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      popupOpen(this.dataset.popup);
    });
  }
};

const headerData = {
  headerBtnHiddenClass: constants.header.elements.hidden_button_class,
  background: constants.header.background,
  headerClass: constants.header.class,
  boxShadow: constants.header.box_shadow,
  elementsColor: constants.header.elements.color,
  loginButtonClass: constants.header.elements.login_button_class,
  logoutIconClass: constants.header.elements.logout_icon_class,
  filter: constants.header.elements.filter,
  savedArticlesButtonClass: constants.header.elements.saved_articles_button_class,
  isLoggedIn: serverData.isAuth,
  mobileMenuTemplate: templates.mobile_menu,
  mobileMenuCloseButtonClass: constants.header.mobile_menu.close_button_class,
  navButtonClass: constants.header.mobile_menu.nav_button_class,
  rootElementClass: constants.root_class,
  popupOpenBtnListener,
};

const headerDefault = new Header(headerData);
const headerMobile = new HeaderMobile(headerData);

const headRender = (() => {
  const isMobile = (window.screen.width < 700);
  const props = {
    isLoggedIn: serverData.isAuth,
    userName: localStorage.getItem('userName'),
  };
  if (isMobile) {
    headerMobile.openBtnAddListener(props);
  } else {
    headerDefault.render(props);
  }
}
);
headRender();

const getCardInstance = ((data) => new NewsCard({
  addArticle,
  removeArticle,
  isLoggedIn: serverData.isAuth,
  newsHelpFieldClass: constants.news.news_help_field_class,
  flagClass: constants.news.news_card_flag_class,
  flagActiveClass: constants.news.news_card_flag_active_class,
  iconClass: constants.news.news_card_icon_class,
  cardDescriptionsClass: constants.news.news_card_descriprions_class,
  dateClass: constants.news.news_card_date_class,
  titleClass: constants.news.news_card_title_class,
  subtitleClass: constants.news.news_card_subtitle_class,
  sourceClass: constants.news.news_card_source_class,
  notFoundUrl: constants.links.news_not_found_icon_link,
  cardTemplate: templates.news.card,
  cardClass: 'news__card',
  dateConverter,
}).cardRender(data));

const cardRender = (data) => getCardInstance(data);

const cardlist = new NewsCardList({
  articleMaxOnPageSteep: 3,
  placeClass: constants.news.news_place_class,
  showMoreButtonClass: constants.news.news_button_show_more_class,
  errorLoadingMessage: constants.news.news_error_loading_message,
  cardPlaceClass: constants.news.news_card_place_class,
  cardRender,
  cardPlaceTemplate: templates.news.card_place,
  loadCardsTemplate: templates.news.load_card_place,
  notFoundCardsTemplate: templates.news.not_found_card_place,
});

const getNews = (keywords) => {
  cardlist.cardPlaceClear();
  cardlist.renderLoader();
  const articles = newsApi.getNews(keywords);
  articles.then((articles) => cardlist.renderResults(articles));
};

new SearchNews({
  buttonClass: constants.search_news.button_class,
  inputClass: constants.search_news.input_class,
  newsClass: constants.news.news_place_class,
  getNews,
}).setHandlers();
