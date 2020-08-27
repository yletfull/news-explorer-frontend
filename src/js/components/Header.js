export default class Header {
  constructor(options) {
    ({
      background: this.background,
      obj: this.obj,
      boxShadow: this.boxShadow,
      elementsColor: this.elementsColor,
      loginButton: this.loginButton,
      logoutIcon: this.logoutIcon,
      filter: this.filter,
    } = options);
  }

  render(props) {
    const { isLoggedIn, userName } = props;
    this.obj.style.color = this.elementsColor;
    this.obj.style.background = this.background;
    this.obj.style['box-shadow'] = this.boxShadow;
    if (isLoggedIn) {
      this.loginButton.textContent = `${userName}`;
      this.loginButton.appendChild(this.logoutIcon);
      this.logoutIcon.classList.remove('header__logout-icon_hidden');
      this.logoutIcon.style['-webkit-filter'] = `${this.filter}`;
    }
  }
}
