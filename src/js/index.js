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

const serverData = {
  origin: 'http://localhost:3000',
  isAuth: !!localStorage.getItem('token'),
};



const api = new MainApi(serverData);

// api.getArticles()
// .then((data) => console.log(data))


const newsApi = new NewsApi({
  differenceDays: -7,
  to: new Date(),
  pageSize: 100,
  url: 'http://newsapi.org/v2/everything?',
  apiKey: 'af5e79492c924fd4bbd647c59c1521b5',

});


const header = new Header({
  background: constants.header.background,
  obj: constants.header.obj,
  boxShadow: constants.header.boxShadow,
  elementsColor: constants.header.elements.color,
  loginButton: constants.header.elements.loginButton,
  logoutIcon: constants.header.elements.logoutIcon,
  filter: constants.header.elements.filter,
  savedArticlesButton: constants.header.elements.saved_articles_button,
  isLoggedIn: serverData.isAuth,
});

const headRender = () => header.render({
  isLoggedIn: serverData.isAuth,
  userName: localStorage.getItem('userName'),
});
headRender();

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

const popupOpenButtons = constants.popups.open_buttons;

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
    button.addEventListener('click', function () {
      popupOpen(this.dataset.popup);
    });
  }
};
popupOpenBtnListener(popupOpenButtons[0]);

const cardlist = new NewsCardList({
 paceClass: constants.news.news_place_class,
 flagClass: constants.news.news_card_flag_class,
 iconClass: constants.news.news_card_icon_class,
 dateClass: constants.news.news_card_date_class,
 titleClass: constants.news.news_card_title_class,
 subtitleClass: constants.news.news_card_subtitle_class,
 sourceClass: constants.news.news_card_source_class,
 showMoreButtonClass: constants.news.news_button_show_more_class,
 templates,
})

const renderNews = (articles) => {
  cardlist.renderResults(articles);
}
const getNews = (keywords) => {
  // cardlist.renderLoader();
  const articles = newsApi.getNews(keywords);
  renderNews(articles);
}
getNews('Путин')
