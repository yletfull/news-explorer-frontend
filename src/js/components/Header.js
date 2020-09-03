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
    } = options);
  }

  render(props) {
    const { isLoggedIn, userName } = props;
    this.obj.style.color = this.elementsColor;
    this.obj.style.background = this.background;
    this.obj.style['box-shadow'] = this.boxShadow;
    this.savedArticlesButton.classList.add('header__nav-button_hidden');
    if (isLoggedIn) {
      this.savedArticlesButton.classList.remove('header__nav-button_hidden');
      this.loginButton.textContent = `${userName}`;
      this.loginButton.appendChild(this.logoutIcon);
      this.logoutIcon.classList.remove('header__logout-icon_hidden');
      this.logoutIcon.style['-webkit-filter'] = `${this.filter}`;
      this._setEventListener();
    }
  }

  _setEventListener() {
    super._setListeners([
      {
        element: this.loginButton,
        event: 'click',
        callback: (event) => {
          localStorage.clear();
          window.location.reload();
        },
      },
    ]);
  }
}
