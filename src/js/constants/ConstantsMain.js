export default {
  header: {
    obj: document.querySelector('header'),
    background: 'rgba(196, 196, 196, 0.01)',
    boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.2)',
    elements: {
      color: '#FFFFFF',
      loginButton: document.querySelector('.header__nav-button_rectangle'),
      logoutIcon: document.querySelector('.header__logout-icon'),
      filter: 'invert(100%)',
    },
  },
  popups: {
    popup: '.popup',
    open_buttons: document.querySelectorAll('#popup-open-button'),
    close_button : '.popup__close',
    entry_button : '.popup__button_entry',
    form : '.popup__form',
    popup_alter_action_link: '.popup__alter-action_link',
    templates: {
      popup_login: `
      <div class="popup__content">
          <h2 class="popup__title">Вход</h2>
          <div class="popup__close"></div>
          <form class="popup__form">
              <p class="popup__input-descriptor">Email</p>
              <input class="input popup__input" type="text" placeholder="Введите почту">
              <p class="popup__input-descriptor">Пароль</p>
              <input class="input popup__input" type="password" placeholder="Введите пароль">
              <button class="button popup__button popup__button_entry">Войти</button>
          </form>
          <p class="popup__alter-action">или <a class="popup__alter-action_link" href="#" data-popup="popup_registration" id='popup-open-button'>Зарегистрироваться</a></p>
      </div>
    `,
      popup_registration: `
            <div class="popup__content">
                <h2 class="popup__title">Регистрация</h2>
                <div class="popup__close"></div>
                <form class="popup__form">
                    <p class="popup__input-descriptor">Email</p>
                    <input class="input popup__input" type="text" placeholder="Введите почту">
                    <p class="popup__input-descriptor">Пароль</p>
                    <input class="input popup__input" type="password" placeholder="Введите пароль">
                    <p class="popup__input-descriptor">Имя</p>
                    <input class="input popup__input" type="text" placeholder="Введите своё имя">
                    <button class="button popup__button popup__button_entry">Зарегистрироваться</button>
                </form>
                <p class="popup__alter-action">или <a class="popup__alter-action_link" href="#" data-popup="popup_login" id='popup-open-button'>Войти</a></p>
   `,
      popup_success_registration: `
      <div class="popup__content">
          <h2 class="popup__title">Пользователь успешно зарегистрирован!</h2>
          <div class="popup__close"></div>
          <a class="popup__alter-action_link" href="#" data-popup="popup_login" id='popup-open-button'>Выполнить вход</a>
      </div>
    `,
    },
  },
};
