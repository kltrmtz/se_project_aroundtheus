class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // ".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImageClick());

    // ".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    // ".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());
  }

  _handleImageClick() {
    this._cardImageEl
      .querySelector("#preview-image-modal")
      .addEventListener("click", () => this._link, this._name);
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();
    // this._cardImageEl = this._cardElement.querySelector(".card__image");
    // this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    // this._cardImageEl.querySelector(
    //   ".card__Image"
    // ).style.backgroundImage = `url(${this._link})`;
    // this._cardTitleEl.querySelector(".card__title").textcontent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
