export const initialCards = [
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

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileExitButton = document.querySelector("#profile-exit-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
// const profileEditForm = profileEditModal.querySelector(".modal__form");
// const profileForm = document.forms["profile-form"];
export const cardListEl = document.querySelector(".cards__list");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// export const previewImageModal = document.querySelector("#preview-image-modal");
// export const previewModalContainer = previewImageModal.querySelector(
//   ".modal__container-preview"
// );
// const previewImageExitButton = document.querySelector(
//   "#preview-image-exit-button"
// );
// export const cardImageEl = previewModalContainer.querySelector(
//   ".modal__preview-image"
// );
// const cardNameEl = previewModalContainer.querySelector(".modal__preview-name");
export const addNewCardButton = document.querySelector("#profile-add-button");
export const addCardModal = document.querySelector("#add-card-modal");
// const addCardExitButton = document.querySelector("#add-card-exit-button");
// const cardTitle = document.querySelector(".card__title");
// export const addCardForm = addCardModal.querySelector(".modal__form");
// const addCardFormEl = addCardModal.querySelector(".modal__form");
// const cardTitleInput = addCardForm.querySelector("#card-title-input");
// const cardUrlInput = addCardForm.querySelector("#card-url-input");
export const cardDeleteButton = document.querySelector(".card__delete-button");
export const deleteCardModal = document.querySelector("#delete-card-modal");
// validation
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};
