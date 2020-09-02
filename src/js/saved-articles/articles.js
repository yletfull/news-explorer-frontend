import '../../css/articles.css';

import Header from '../components/Header';
import Popup from '../components/Popup';
import Form from '../components/Form';
import constants from '../constants/ConstantsArticles';
import templates from '../templates/Templates';

const header = new Header({
  background: constants.header.background,
  obj: constants.header.obj,
  boxShadow: constants.header.boxShadow,
  elementsColor: constants.header.elements.color,
  loginButton: constants.header.elements.loginButton,
  logoutIcon: constants.header.elements.logoutIcon,
  filter: constants.header.elements.filter,
  savedArticlesButton: constants.header.elements.saved_articles_button,
});

header.render({
  isLoggedIn: true,
  userName: 'Andrew',
});

const formValidator = (form) => new Form({
  form,
  popupErrorClass: constants.form.popup_eror_class,
  entryButtonClass: constants.form.entry_button_class,
  inputErrorClass: constants.form.input_error_class,
});

const popupOpenButtons = constants.popups.open_buttons;

const popupListener = function (button) {
  button.addEventListener('click', function () {
    const popupTemplate = templates.popups[`${this.dataset.popup}`];
    const closeButton = constants.popups.close_button;
    const entryButton = constants.popups.entry_button;
    const errorText = constants.popups.error_error_text;
    const { form } = constants.popups;
    const alterActionButton = constants.popups.popup_alter_action_link;
    new Popup({
      popupTemplate, closeButton, entryButton, form, alterActionButton, popupListener, errorText, formValidator,
    }).open();
  });
};
popupListener(popupOpenButtons[0]);

// const authButton = document.querySelector('#authorization-button');
// const authForm = document.querySelector('.popup_login');
// const regForm = document.querySelector('.popup_registration');

// authButton.addEventListener('click', () => {
//   authForm.classList.remove('popup_hidden');

//   const closeButton = document.querySelector('.popup__close');
//   closeButton.addEventListener('click', () => {
//     authForm.classList.add('popup_hidden');
//   });

//   const altButton = document.querySelector('.popup__alter-action_link');
//   altButton.addEventListener('click', () => {
//     authForm.classList.add('popup_hidden');
//     regForm.classList.remove('popup_hidden');
//     const closeButton = document.querySelector('.popup__close');
//     closeButton.addEventListener('click', () => {
//       regForm.classList.add('popup_hidden');
//     });
//   });
// });

// if (screen.width < 700) {
//   const nav = document.querySelector('.header__navigation');
//   nav.addEventListener('click', () => {
//     if (screen.width < 700) {
//         const menu = document.querySelector('.mobile-menu');
//         menu.classList.remove('mobile-menu_hidden');
//         const close = document.querySelector('.mobile-menu__close');
//         close.addEventListener('click',function(){
//             menu.classList.add('mobile-menu_hidden');
//         });
//     }
//   });
// }
