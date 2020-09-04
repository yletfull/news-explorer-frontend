import '../css/main.css';

import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import constants from './constants/ConstantsMain';
import templates from './templates/Templates';
import Api from './api/Api';

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
  const { form } = constants.popups;
  new Popup({
    popupTemplate: templates.popups[`${popupName}`],
    closeButton: constants.popups.close_button,
    entryButton: constants.popups.entry_button,
    form,
    alterActionButton: constants.popups.popup_alter_action_link,
    popupOpen,
    errorText: constants.popups.error_error_text,
    formValidator,
    api,
    getformInstance,
    headRender,
    templates,
    rootClass: constants.rootClass,
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
