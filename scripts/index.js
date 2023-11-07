const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileExitButton = document.querySelector("#profile-exit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//find preview image modal

//new
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardExitButton = document.querySelector("#add-card-exit-button");
const cardTitle = document.querySelector(".card__title");

//new new
const addCardForm = addCardModal.querySelector(".modal__form");

const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardLinkInput = addCardForm.querySelector("#card-link-input");

/* Functions */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  //new
  addCardModal.classList.remove("modal_opened");
}

// new new

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

/* Event Handlers */

function handleEditProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

//new new
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTileEl = cardElement.querySelector(".card__title");

  //new like button
  const likeButton = cardElement.querySelector(".card__like-button");
  //find delete button

  //add the event listner to the delete button
  // call cardElement.remove();

  //add click listner to the cardImage element
  // openModal with previewImageModal

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;

  cardImageEl.alt = cardData.name;

  cardTileEl.textContent = cardData.name;

  return cardElement;
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileEditModal.classList.add("modal_opened");
});

profileExitButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleEditProfileFormSubmit);
//new new
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// add new card button
addNewCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

addCardExitButton.addEventListener("click", closePopup);
//above new

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
