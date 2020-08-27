import '../css/main.css';

import Header from './components/Header';
import constants from './constants/ConstantsMain';

const header = new Header({
  background: constants.header.background,
  obj: constants.header.obj,
  boxShadow: constants.header.boxShadow,
  elementsColor: constants.header.elements.color,
  loginButton: constants.header.elements.loginButton,
  logoutIcon: constants.header.elements.logoutIcon,
  filter: constants.header.elements.filter,
});

 header.render({
  isLoggedIn : true,
  userName : 'Andrew',
})


















// import Popup from './components/Popup';
// import MobileMenu from './components/MobileMenu';

// let currentOpenPopup = '';
// const popupOpenButtons = document.querySelectorAll('#popup-open-button');

// const popupListener = function () {
//   for (const button of popupOpenButtons) {
//     button.addEventListener('click', function () {
//       const popup = document.querySelector(`.${this.dataset.popup}`);
//       const closeButton = popup.querySelector('.popup__close');
//       const entryButton = popup.querySelector('.popup__button_entry');
//       if (currentOpenPopup) {
//         currentOpenPopup.classList.add('popup_hidden');
//       }
//       currentOpenPopup = popup;
//       new Popup({
//         popup, closeButton, entryButton,
//       }).open();
//     });
//   }
// };
// popupListener();

// const mobileMenuListener = function () {
//   const mobileMenuActivateWidth = 700;
//   if (screen.width < mobileMenuActivateWidth) {
//     const nav = document.querySelector('.header__navigation');
//     const menu = document.querySelector('.mobile-menu');
//     const closeButton = document.querySelector('.mobile-menu__close');
//     nav.addEventListener('click', () => {
//       if (screen.width < mobileMenuActivateWidth) {
//         new MobileMenu({
//           menu,
//           closeButton,
//         }).open();
//       }
//     });
//   }
// };
// mobileMenuListener();



