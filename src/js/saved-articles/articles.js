import '../../css/articles.css';

import Header from '../components/Header';
import constants from '../constants/ConstantsArticles';
import Api from '../api/MainApi';
import templates from '../templates/Templates';
import SavedArticlesInfo from '../components/saved-articles/SavedArticlesInfo';
import NewsCard from '../components/saved-articles/NewsCard';
import NewsCardList from '../components/saved-articles/NewsCardList';

const serverData = {
  origin: 'http://localhost:3000',
  isAuth: !!localStorage.getItem('token'),
};

const api = new Api(serverData);

const getArticles = () => api.getArticles();
const removeArticle = (article) => {
  const data = {};
  data.article = article;
  return api.removeArticle(data);
};

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

const userName = localStorage.getItem('userName');
const headRender = () => header.render({
  isLoggedIn: serverData.isAuth,
  userName,
});

headRender();

const savedArticlesInfo = new SavedArticlesInfo({
  savedArticlesSubtitleClass: constants.saved_articles.subtitleClass,
  savedArticlesKeywordsClass: constants.saved_articles.keywordsClass,
});
const rendersavedArticlesInfo = (keywords) => savedArticlesInfo.render({
  keywords,
  userName,
});

const getCardInstance = ((data) => new NewsCard({
  removeArticle,
  isLoggedIn: serverData.isAuth,
  cardDeleteButtonClass: constants.news.news__card_delete_button_class,
  cardDeleteButtonActiveClass: 'news__delete-button_active',
  cardTagPlaceClass: constants.news.news__card_tag_place_class,
  newsHelpFieldClass: constants.news.news_help_field_class,
  iconClass: constants.news.news_card_icon_class,
  cardDescriptionsClass: constants.news.news_card_descriprions_class,
  dateClass: constants.news.news_card_date_class,
  titleClass: constants.news.news_card_title_class,
  subtitleClass: constants.news.news_card_subtitle_class,
  sourceClass: constants.news.news_card_source_class,
  notFoundUrl: constants.links.news_not_found_icon_link,
  cardClass: 'news__card',
  cardTemplate: templates.news.saved_articles_card,
}).cardRender(data));

const cardRender = (data) => getCardInstance(data);

const cardlist = new NewsCardList({
  articleMaxOnPageSteep: 3,
  placeClass: constants.news.news_place_class,
  showMoreButtonClass: constants.news.news_button_show_more_class,
  errorLoadingMessage: constants.news.news_error_loading_message,
  cardPlaceClass: constants.news.news_card_place_class,
  cardRender,
  rendersavedArticlesInfo,
  cardPlaceTemplate: templates.news.saved_articles_card_place,
  loadCardsTemplate: templates.news.load_card_place,
  notFoundCardsTemplate: templates.news.not_found_card_place,
});

const loader = () => {
  if (!serverData.isAuth) { window.location.replace('./index.html'); } else {
    cardlist.cardPlaceClear();
    cardlist.renderLoader();
    const articles = getArticles();
    articles.then((articles) => cardlist.renderResults(articles));
  }
};
loader();
