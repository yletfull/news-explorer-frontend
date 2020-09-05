import '../../css/articles.css';

import Header from '../components/Header';
import constants from '../constants/ConstantsArticles';
import Api from '../api/MainApi';

const serverData = {
  origin: 'http://localhost:3000',
  isAuth: !!localStorage.getItem('token'),
};

const redirect = () => {
  if (!serverData.isAuth) { window.location.replace('./index.html'); }
};
redirect();

const api = new Api(serverData);

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

