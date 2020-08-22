import '../css/articles.css';

if (screen.width < 700) {
  const nav = document.querySelector('.header__navigation');
  nav.addEventListener('click', () => {
    if (screen.width < 700) {
      const menu = document.querySelector('.mobile-menu');
      menu.classList.remove('mobile-menu_hidden');
      const close = document.querySelector('.mobile-menu__close');
      close.addEventListener('click', () => {
        menu.classList.add('mobile-menu_hidden');
      });
    }
  });
}
