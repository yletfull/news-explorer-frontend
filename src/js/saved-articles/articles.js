import '..//../css/articles.css';

import Header from '..//components/Header';
import constants from '..//constants/ConstantsArticles';

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
