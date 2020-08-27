export default class Popup {
  constructor(data) {
    ({
      popup: this.popup,
      closeButton: this.closeButton,
      entryButton: this.entryButton,
    } = data);
    this.addEventListener = this.addEventListener.bind(this);
    this.addEventListener();
  }

  open() {
    this.popup.classList.remove('popup_hidden');
  }

  close() {
    this.popup.classList.add('popup_hidden');
  }

  setContent(){
    this.popup.insertAdjecentHTML('afterbegin', {
      
    })
  }

  clearContent(){

  }
  
  addEventListener() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', (event) => {
        this.close(event);
      });
    }
    if (this.entryButton) {
      this.entryButton.addEventListener('click', (event) => {
        event.preventDefault();
       
      });
    }
  }
}
