import '../css/main.css';

import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import constants from './constants/ConstantsMain';
import templates from './templates/Templates';
import Api from './api/Api';
import NewsCardList from './components/NewsCardList';
import NewsCard from './components/NewsCard';

const serverData = {
  origin: 'http://localhost:3000',
  isAuth: !!localStorage.getItem('token'),
};

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

// const cardlist = new cardlist({

// })
