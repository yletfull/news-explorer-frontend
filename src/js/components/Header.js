import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(options) {
    super();
    ({
      rootElementClass: this.rootElementClass,
      background: this.background,
      headerClass: this.headerClass,
      loginButtonClass: this.loginButtonClass,
      savedArticlesButtonClass: this.savedArticlesButtonClass,
      mobileMenuCloseButtonClass: this.mobileMenuCloseButtonClass,
      navButtonClass: this.navButtonClass,
      logoutIconClass: this.logoutIconClass,
      boxShadow: this.boxShadow,
      elementsColor: this.elementsColor,
      filter: this.filter,
      isLoggedIn: this.isLoggedIn,
      mobileMenuTemplate: this.mobileMenuTemplate,
      headerBtnHiddenClass: this.headerBtnHiddenClass,
      popupOpenBtnListener: this.popupOpenBtnListener = false,
    } = options);
    this.rootElement = document.querySelector(`.${this.rootElementClass}`);
    this.header = this.rootElement.querySelector(`.${this.headerClass}`);
    this.loginButton = this.header.querySelector(`.${this.loginButtonClass}`);
    this.savedArticlesButton = this.header.querySelector(`.${this.savedArticlesButtonClass}`);
    this.navButton = this.header.querySelector(`.${this.navButtonClass}`);
    this.logoutIcon = this.header.querySelector(`.${this.logoutIconClass}`);
  }

  render(props) {
    const { isLoggedIn, userName } = props;
    this.userName = userName;
    this.isLoggedIn = isLoggedIn;
    this.header.style.color = this.elementsColor;
    this.header.style.background = this.background;
    this.header.style.boxShadow = this.boxShadow;
    this.savedArticlesButton.classList.add(`${this.headerBtnHiddenClass}`);
    if (!this.isLoggedIn && this.popupOpenBtnListener) {
      this.popupOpenBtnListener(this.loginButton);
    }
    if (this.isLoggedIn) {
      this.savedArticlesButton.classList.remove(`${this.headerBtnHiddenClass}`);
      this.loginButton.textContent = `${this.userName}`;
      this.loginButton.appendChild(this.logoutIcon);
      this.logoutIcon.classList.remove(`${this.logoutIconClass}_hidden`);
      this.logoutIcon.style['-webkit-filter'] = `${this.filter}`;
      this._setHandlers();
    }
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
}
