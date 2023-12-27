import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = this._popupForm.querySelectorAll(".modal__input");

    inputs.forEach((input) => {
      inputValues((input.name = input.value));
    });
    return inputValues;
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }
  // function handleAddCardFormSubmit(e) {
  //   e.preventDefault();
  //   const name = cardTitleInput.value;
  //   const link = cardUrlInput.value;
  //   renderCard({ name, link }, cardListEl);
  //   closePopup(addCardModal);
  //   addCardFormEl.reset();
  //   addFormValidator.toggleButtonState();
  // }

  // function handleEditProfileFormSubmit(e) {
  //   e.preventDefault();
  //   profileTitle.textContent = profileTitleInput.value;
  //   profileDescription.textContent = profileDescriptionInput.value;
  //   closePopup(profileEditModal);

  //   // new add after review
  //   editFormValidator.resetValidation();
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}

export default PopupWithForm;
