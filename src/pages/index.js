import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/section.js";
import "./index.css";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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
const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalContainer = previewImageModal.querySelector(
  ".modal__container-preview"
);
const previewImageExitButton = document.querySelector(
  "#preview-image-exit-button"
);
const cardImageEl = previewModalContainer.querySelector(
  ".modal__preview-image"
);
const cardNameEl = previewModalContainer.querySelector(".modal__preview-name");
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardExitButton = document.querySelector("#add-card-exit-button");
const cardTitle = document.querySelector(".card__title");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

// new cardselector
const cardSelector = "#card-template";

// new validation
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// new working

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardListEl = createCard(cardData);
      cardSection.addItem(cardListEl);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
// newCardPopup.open();

// newCardPopup.close();
// today
const newCardPopup = new PopupWithForm("#add-card-modal", (modalData) => {
  const name = modalData.name;
  const link = modalData.link;
  handleFormSubmit(name, link);
});
newCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open(addCardModal);
});

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (modalData) => {
    const title = modalData.title;
    const description = modalData.description;
    document.profileTitle.textContent = title;
    document.profileDescription.textContent = description;
  }
);
editProfilePopup.setEventListeners();

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.link, cardData.name);
  });
  return cardElement.getView();
}

/* Functions */
// today
// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleCloseOnEscape);
// }

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleCloseOnEscape);
// }

// today
// close escape
// function handleCloseOnEscape(e) {
//   if (e.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     closePopup(modal);
//   }
// }

// Today

// function renderCard(cardData, cardListEl) {
//   const card = new Card(cardData, cardSelector, handleImageClick);
//   cardListEl.prepend(card.getView());
// }

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove("card");
//   });

//   cardImageEl.addEventListener("click", () => {
//     openModal(previewImageModal);
//     previewImageEl.src = cardData.link;
//     previewImageEl.alt = cardData.name;
//     previewNameEl.textContent = cardData.name;
//   });

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;

//   return cardElement;
// }

// new handleimageclick function

// today
// function handleImageClick(name, link) {
//   openModal(previewImageModal);
//   // cardImageEl.src = link;
//   // cardImageEl.alt = name;
//   // cardNameEl.textContent = name;
// }

/* Event Handlers */
// today
// function handleEditProfileFormSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);

//   // new add after review
//   editFormValidator.resetValidation();
// }

// today
// function handleAddCardFormSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardListEl);
//   closePopup(addCardModal);
//   addCardFormEl.reset();
//   addFormValidator.toggleButtonState();
// }

/* Event Listeners */

// close popups overlay
// today
// const popups = document.querySelectorAll(".modal");
// today
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
// today
// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
// });
// today
// profileExitButton.addEventListener("click", () => closePopup(profileEditModal));
// today
// profileEditForm.addEventListener("submit", handleEditProfileFormSubmit);
// today
// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// addNewCardButton.addEventListener("click", () => openModal(addCardModal));
// today
// addCardExitButton.addEventListener("click", () => closePopup(addCardModal));
// today
// previewImageExitButton.addEventListener("click", () =>
//   closePopup(previewImageModal)
// );
// today
// initialCards.forEach((cardData) => {
//   renderCard(cardData, cardListEl);
// });
