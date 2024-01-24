import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import "./index.css";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
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
  deleteCardModal,
  cardDeleteButton,
} from "../utils/constants.js";

// today vv
// new Api

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0b8c38f4-d4b8-4f4c-9f71-c5f40b59e7bc",
    "Content-Type": "application/json",
  },
});

// validation

const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = addCardModal.querySelector(".modal__form");
const deleteFormEl = deleteCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
const deleteFormValidator = new FormValidator(validationSettings, deleteFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
deleteFormValidator.enableValidation();

// new delete card form

const deleteCardPopup = new PopupWithSubmit(
  "#delete-card-modal"
  // handleDeleteClick
  // handleDeleteCardSubmit
);

deleteCardPopup.setEventListeners();

// cardDeleteButton.addEventListener("click", () => {
//   // deleteFormValidator.resetValidation();
//   deleteCardPopup.open(deleteCardModal);
// });

function handleDeleteClick(card) {
  // console.log(cardData);
  // open modal
  // deleteCardPopup.open(deleteCardModal);
  deleteCardPopup.open();
  // call set submit action
  // pass set submit action handleDeleteCardSubmit
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(card._Id)
      .then(() => {
        card.handleDeleteClick();
        deleteFormValidator.resetValidation();

        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  });
}

// --yesterday
// function handleDeleteCardSubmit(id) {
//   // this is where you open the modal
//   // call setSubmitAction method
//   // pass the setSubmitAction method the api related code
//   api
//     .deleteCards(id)
//     .then((res) => {
//       cardSection.addItem({ name, link });

//       renderCard({ name, link });

//       deleteCardPopup.close();
//     })
//     .catch((err) => {
//       console.log(err); // log the error to the console
//     });
// }

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
  api
    .createCard({ name, link })
    .then((res) => {
      cardSection.addItem({ name, link });

      renderCard({ name, link });

      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
}

// user info

const userInfo = new UserInfo(".profile__title", ".profile__description");

// edit profile form

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
  api
    .updateUserProfileInfo(modalData)
    .then((res) => {
      userInfo.setUserInfo(modalData.title, modalData.description);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
}

// cardselector
const cardSelector = "#card-template";

// image popup

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

// recommended by tutor..breaks code
// function createCard(cardData) {
//   const cardElement = new Card({
//     data: { cardData },
//     handleImageClick: (cardElement) => {
//       popupWithImage.open(cardData.link, cardData.name);
//     },
//   });
//   return cardElement.getView();
// }

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    () => {
      popupWithImage.open(cardData.link, cardData.name);
    },
    // pass the delete handler
    handleDeleteClick
  );
  return cardElement.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

// // new Api

let cardSection;

api
  .getInitialCards()
  .then((res) => {
    cardSection = new Section(
      {
        items: res,
        renderer: (cardData) => {
          createCard(cardData);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
    // console.log(res);
  })

  .catch((err) => {
    console.log(err); // log the error to the console
  });

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    // Need to Create this function
    // userInfo.setUserAvatar(res);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
