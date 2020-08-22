import '../css/main.css';

// не читать, убьет!

const authButton = document.querySelector('#authorization-button');
const authForm = document.querySelector('.popup_login');
const regForm = document.querySelector('.popup_registration');

authButton.addEventListener('click', () => {
  authForm.classList.remove('popup_hidden');

  const closeButton = document.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    authForm.classList.add('popup_hidden');
  });

  const altButton = document.querySelector('.popup__alter-action_link');
  altButton.addEventListener('click', () => {
    authForm.classList.add('popup_hidden');
    regForm.classList.remove('popup_hidden');
    const closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
      regForm.classList.add('popup_hidden');
    });
  });
});

if (screen.width < 700) {
  const nav = document.querySelector('.header__navigation');
  nav.addEventListener('click', () => {
    if (screen.width < 700) {
        const menu = document.querySelector('.mobile-menu');
        menu.classList.remove('mobile-menu_hidden');
        const close = document.querySelector('.mobile-menu__close');
        close.addEventListener('click',function(){
            menu.classList.add('mobile-menu_hidden');
        });
    }   
  });
}
