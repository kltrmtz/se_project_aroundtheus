import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    super.open();

    const cardImageEl = this._popupElement.queryselector(link);
    const cardNameEl = this._popupElement.queryselector(name);

    // from indexjs
    // function handleImageClick(name, link) {
    //     openModal(previewImageModal);
    //     cardImageEl.src = link;
    //     cardImageEl.alt = name;
    //     cardNameEl.textContent = name;
    //   }
  }

  close() {
    super.close();
  }
}
