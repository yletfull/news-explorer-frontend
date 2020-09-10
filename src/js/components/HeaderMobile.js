import Header from './Header';

export default class HeaderMobile extends Header {
  constructor(data) {
    super(data);
    this.openBtnAddListener = this.openBtnAddListener.bind(this);
  }

  _render(props) {
    const { isLoggedIn, userName } = props;
    this.userName = userName;
    this.isLoggedIn = isLoggedIn;
    this.menu = document.createElement('div');
    this.menu.insertAdjacentHTML('beforeend', this.mobileMenuTemplate);
    this.closeButton = this.menu.querySelector(`.${this.mobileMenuCloseButtonClass}`);
    this.savedArticlesButton = this.menu.querySelector(`.${this.savedArticlesButtonClass}`);
    this.savedArticlesButton.classList.add(`${this.headerBtnHiddenClass}`);
    this.rootElement.appendChild(this.menu);
    this.loginButton = this.menu.querySelector(`.${this.loginButtonClass}`);
    this.loginButton.textContent = 'Авторизоваться';
    if (this.isLoggedIn) {
        this.savedArticlesButton.classList.remove(`${this.headerBtnHiddenClass}`);
      this.loginButton.textContent = `${this.userName}`;
      this.loginButton.appendChild(this.logoutIcon);
      this._setHandlers();
    }
  }

  _mobileMenuRemove() {
    this.menu.parentElement.removeChild(this.menu);
    super._clearListener();
  }

  _setHandlers() {
    super._setListeners([
      {
        element: this.loginButton,
        event: 'click',
        callback: () => {
          localStorage.clear();
          window.location.reload();
        },
      },
    ]);
  }

  openBtnAddListener(props) {
    super._setListeners([
      {
        element: this.navButton,
        event: 'click',
        callback: () => {
          this._render(props);
        },
      },
    ]);
  }
}
