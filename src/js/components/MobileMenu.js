export default class MobileMenu {
  constructor(data) {
    ({
      menu: this.menu,
      closeButton: this.closeButton,
    } = data);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.addEventListener();
  }

  open() {
    this.menu.classList.remove('mobile-menu_hidden');
  }

  close() {
    this.menu.classList.add('mobile-menu_hidden');
  }

  addEventListener() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', (event) => {
        this.close(event);
      });
    }
  }
}
