import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(options) {
    super();
    ({
      background: this.background,
      obj: this.obj,
      boxShadow: this.boxShadow,
      elementsColor: this.elementsColor,
      loginButton: this.loginButton,
      logoutIcon: this.logoutIcon,
      filter: this.filter,
      savedArticlesButton: this.savedArticlesButton,
      isLoggedIn: this.isLoggedIn,
      mobileMenuTemplate: this.mobileMenuTemplate,
      mobileMenuCloseButtonClass: this.mobileMenuCloseButtonClass,
      navButtonClass: this.navButtonClass,
      rootElementClass: this.rootElementClass,
    } = options);
    this.rootElement = document.querySelector(`.${this.rootElementClass}`);
    this.navButton = this.obj.querySelector(`.${this.navButtonClass}`);
  }

  render(props) {
    const { isLoggedIn, userName } = props;
    this.obj.style.color = this.elementsColor;
    this.obj.style.background = this.background;
    this.obj.style.boxShadow = this.boxShadow;
    this.savedArticlesButton.classList.add('header__nav-button_hidden');
    if (isLoggedIn) {
      this.savedArticlesButton.classList.remove('header__nav-button_hidden');
      this.loginButton.textContent = `${userName}`;
      this.loginButton.appendChild(this.logoutIcon);
      this.logoutIcon.classList.remove('header__logout-icon_hidden');
      this.logoutIcon.style['-webkit-filter'] = `${this.filter}`;
      this._setHandlers();
    }
  }

  _mobileMenuRender() {
    this.menu = document.createElement('div');
    this.menu.insertAdjacentHTML('beforeend', this.mobileMenuTemplate);
    this.closeButton = this.menu.querySelector(`.${this.mobileMenuCloseButtonClass}`);
    if (this.closeButton) {
      super._setListeners([
        {
          element: this.closeButton,
          event: 'click',
          callback: () => {
            this._mobileMenuCLose();
          },
        },
      ]);
    }
    this.rootElement.appendChild(this.menu);
  }

  _mobileMenuClose() {
    this.menu.parentElement.removeChild(this.menu);
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
    if (window.screen.width < 700) {
      super._setListeners([
        {
          element: this.navButton,
          event: 'click',
          callback: () => {
            if (window.screen.width < 700) {
              this._mobileMenuRender();
            }
          },
        },
      ]);
    }
  }
}
