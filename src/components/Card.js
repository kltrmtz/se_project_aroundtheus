class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleIsLiked
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleIsLiked = handleIsLiked;
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );

    this._cardLikeButton.addEventListener("click", () =>
      this._handleIsLiked(this)
    );

    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  handleDeleteCard() {
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

  getId() {
    return this._id;
  }

  setLiked(isLiked) {
    this._isLiked = isLiked;
    this._updateLiked();
  }

  isLiked() {
    return this._isLiked;
  }

  _updateLiked() {
    if (this._isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }
}

export default Card;
