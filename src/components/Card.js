class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteCardClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._id = _id;
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );

    this._cardLikeButton.addEventListener("click", () =>
      this._handleLikeIcon()
    );

    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleDeleteCardClick() {
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
        this._handleDeleteCardClick({
          name: this._name,
          link: this._link,
        });
      });
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  getID() {
    return this._id;
  }
}

export default Card;
