export default {
  popups: {
    popup_login: `
        <div class="popup__content">
        <h2 class="popup__title">Вход</h2>
        <div class="popup__close"></div>
        <form class="popup__form">
            <p class="popup__input-descriptor">Email</p>
            <input class="input popup__input" type="text" data-type="email" placeholder="Введите почту">
            <p class="popup__input-error popup__input-error_hidden">Некорректный e-mail</p>
            <p class="popup__input-descriptor">Пароль</p>
            <input class="input popup__input" type="password" data-type="password" placeholder="Введите пароль">
            <p class="popup__input-error popup__input-error_hidden">Некорректный пароль</p>
            <p class="popup__error popup__error_hidden">Ошибка</p>
            <button class="button popup__button popup__button_disable popup__button_entry" data-button-action="signin">Войти</button>
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
                      <input class="input popup__input" data-type="email" type="text" placeholder="Введите почту">
                      <p class="popup__input-error popup__input-error_hidden">Некорректный e-mail</p>
                      <p class="popup__input-descriptor">Пароль</p>
                      <input class="input popup__input" data-type="password" type="password" placeholder="Введите пароль">
                      <p class="popup__input-error popup__input-error_hidden">Некорректный пароль</p>
                      <p class="popup__input-descriptor">Имя</p>
                      <input class="input popup__input" data-type="name" type="text" placeholder="Введите своё имя">
                      <p class="popup__input-error popup__input-error_hidden">Некорректное имя</p>
                      <p class="popup__error popup__error_hidden"></p>
                      <button class="button popup__button popup__button_disable popup__button_entry" data-button-action="signup">Зарегистрироваться</button>
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

};
