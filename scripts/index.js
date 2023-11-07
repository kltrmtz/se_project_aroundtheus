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
//new
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardExitButton = document.querySelector("#add-card-exit-button");
const cardTitle = document.querySelector(".card__title");

const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");

/* Functions */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  //new
  addCardModal.classList.remove("modal_opened");
}

/* Event Handlers */

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTileEl = cardElement.querySelector(".card__title");

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

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

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
