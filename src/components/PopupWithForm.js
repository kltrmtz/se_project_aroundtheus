import Popup from "./Fix.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.queryselector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

//  index.js

const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
newCardPopup.open();

newCardPopup.close();
