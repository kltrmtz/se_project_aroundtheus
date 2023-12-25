import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector("#preview-image");
    this._previewName = document.querySelector("#preview-name");
  }

  open(link, name) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewName.textContent = name;
    super.open();

    // const cardImageEl = this._popupElement.queryselector(link);
    // const cardNameEl = this._popupElement.queryselector(name);

    // from indexjs
    // function handleImageClick(name, link) {
    //     openModal(previewImageModal);
    //   cardImageEl.src = link;
    //   cardImageEl.alt = name;
    //   cardNameEl.textContent = name;
    // }
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
