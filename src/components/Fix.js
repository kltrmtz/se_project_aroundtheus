class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  // opens popup
  open() {
    this._popupElement.classList.add("modal_opened");

    document.addEventListener("keydown", handleCloseOnEscape);

    // from indexjs
    // function openModal(modal) {
    //   modal.classList.add("modal_opened");
    //   document.addEventListener("keydown", handleCloseOnEscape);
    // }
  }

  // closes popup
  close() {
    this._popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", handleCloseOnEscape);

    // from indexjs
    // function closePopup(modal) {
    //   modal.classList.remove("modal_opened");
    //   document.removeEventListener("keydown", handleCloseOnEscape);
    // }
  }

  // listens for esc button
  _handleEscClose() {
    if (e.key === "Escape") {
      this.close();
      // from indexjs
      // function handleCloseOnEscape(e) {
      //   if (e.key === "Escape") {
      //     const modal = document.querySelector(".modal_opened");
      //     closePopup(modal);
      //   }
      // }
    }
  }

  // sets event listeners
  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
    // from indexjs
    // popups.forEach((popup) => {
    //   popup.addEventListener("mousedown", (evt) => {
    //     if (evt.target.classList.contains("modal_opened")) {
    //       closePopup(popup);
    //     }
    //     if (evt.target.classList.contains("modal__close")) {
    //       closePopup(popup);
    //     }
    //   });
    // });
  }
}

export default Popup;