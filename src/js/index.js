import '../css/main.css';

import Header from './components/Header';
import Popup from './components/Popup';
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
  isLoggedIn: true,
  userName: 'Andrew',
});

const popupOpenButtons = constants.popups.open_buttons;

// import MobileMenu from './components/MobileMenu';

const popupListener = function (button) {
  button.addEventListener('click', function () {
    const popupTemplate = constants.popups.templates[`${this.dataset.popup}`];
    const closeButton = constants.popups.close_button;
    const entryButton = constants.popups.entry_button;
    const { form } = constants.popups;
    const alterActionButton = constants.popups.popup_alter_action_link;
    new Popup({
      popupTemplate, closeButton, entryButton, form, alterActionButton, popupListener,
    }).open();
  });
};
popupListener(popupOpenButtons[0]);

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
