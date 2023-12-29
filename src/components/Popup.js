class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  // opens popup
  open() {
    this._popupElement.classList.add("modal_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  // closes popup
  close() {
    this._popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  // listens for esc button
  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal__close")) {
        this.close();
      }
      this._popupElement.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal_opened")) {
          this.close();
        }
      });
    });
  }
}

export default Popup;
