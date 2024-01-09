import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import "./index.css";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditButton,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardListEl,
  addNewCardButton,
  addCardModal,
  validationSettings,
} from "../utils/constants.js";

// validation

const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// new Section

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

cardSection.renderItems();

// new add card form

const newCardPopup = new PopupWithForm("#add-card-modal", (modalData) => {
  const name = modalData.title;
  const link = modalData.url;
  handleNewCardSubmit(name, link);
});
newCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open(addCardModal);
});

function handleNewCardSubmit(name, link) {
  renderCard({ name, link });

  newCardPopup.close();
}

// new user info

const userInfo = new UserInfo(".profile__title", ".profile__description");

// new edit profile form

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileFormSubmit
);

editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const { title, description } = userInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = description;

  editProfilePopup.open();
});

function handleEditProfileFormSubmit(modalData) {
  userInfo.setUserInfo(modalData.title, modalData.description);
  editProfilePopup.close();
}

// new cardselector
const cardSelector = "#card-template";

// new image popup

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.link, cardData.name);
  });
  return cardElement.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

// new Api

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0b8c38f4-d4b8-4f4c-9f71-c5f40b59e7bc",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((res) => {
    userInfo.getUserInfo(res);
    // Need to Create this function
    // userInfo.setUserAvatar(res);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

api
  .getInitialCards()
  .then((items) => {
    // process the result
    cardSection.renderItems(items);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

// fetch("https://around-api.en.tripleten-services.com/v1", {
//   headers: {
//     // authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
//     authorization: "145bcc9f-2daa-4928-8610-f863960cc29a",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// vvv old vvv //
/* Functions */

// function handleImageClick(link, name) {
//   popupWithImage.open(name, link);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleCloseOnEscape);
// }

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleCloseOnEscape);
// }

// close escape
// function handleCloseOnEscape(e) {
//   if (e.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     closePopup(modal);
//   }
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

// function handleImageClick(name, link) {
//   openModal(previewImageModal);
//   // cardImageEl.src = link;
//   // cardImageEl.alt = name;
//   // cardNameEl.textContent = name;
// }

/* Event Handlers */

// function handleEditProfileFormSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);

//   // new add after review
//   editFormValidator.resetValidation();
// }

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

// const popups = document.querySelectorAll(".modal");

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

// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
// });

// profileExitButton.addEventListener("click", () => closePopup(profileEditModal));

// profileEditForm.addEventListener("submit", handleEditProfileFormSubmit);

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// addNewCardButton.addEventListener("click", () => openModal(addCardModal));

// addCardExitButton.addEventListener("click", () => closePopup(addCardModal));

// previewImageExitButton.addEventListener("click", () =>
//   closePopup(previewImageModal)
// );

// initialCards.forEach((cardData) => {
//   renderCard(cardData, cardListEl);
// });
