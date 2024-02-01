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
  changeAvatarModal,
} from "../utils/constants.js";

// new Api

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6b9d7180-5da2-43d6-9d7c-b9be27da22d3",
    "Content-Type": "application/json",
  },
});

// validation

const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = addCardModal.querySelector(".modal__form");
const deleteFormEl = deleteCardModal.querySelector(".modal__form");
const avatarFormEl = changeAvatarModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
const deleteFormValidator = new FormValidator(validationSettings, deleteFormEl);
const avatarFormValidator = new FormValidator(validationSettings, avatarFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
deleteFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// new delete card form

const deleteCardPopup = new PopupWithSubmit("#delete-card-modal");

deleteCardPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteCardPopup.open();

  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.handleLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          deleteCardPopup.handleLoading(false);
        }, 2500);
      });
  });
}

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
  newCardPopup.handleLoading(true);
  api
    .createCard({ name, link })
    .then((res) => {
      cardSection.addItem(res);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {
      setTimeout(() => {
        newCardPopup.handleLoading(false);
      }, 2500);
    });
}

// new is liked

function handleIsLiked(card) {
  if (card.isLiked()) {
    api
      .dislikeCards(card._id)
      .then((res) => {
        card.setLiked(res._updateLiked);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  } else {
    api
      .likeCards(card._id)
      .then((res) => {
        card.setLiked(!res._updateLiked);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }
}

// new update profile avatar
const profileAvatarButton = document.querySelector(
  ".profile__image-avatar-button"
);
profileAvatarButton.addEventListener("click", () => {
  changeAvatarPopup.open();
});

const changeAvatarPopup = new PopupWithForm(
  "#change-avatar-modal",
  handleUpdateAvatar
);
changeAvatarPopup.setEventListeners();

function handleUpdateAvatar(inputValues) {
  changeAvatarPopup.handleLoading(true);
  api
    .updateAvatar(inputValues.url)
    .then((res) => {
      userInfo.setUserAvatar(inputValues.url);
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {
      setTimeout(() => {
        changeAvatarPopup.handleLoading(false);
      }, 2500);
    });
}

// user info

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

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
  editProfilePopup.handleLoading(true);
  api
    .updateUserProfileInfo(modalData)
    .then((res) => {
      userInfo.setUserInfo(modalData.title, modalData.description);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {
      setTimeout(() => {
        editProfilePopup.handleLoading(false);
      }, 2500);
    });
}

// cardselector
const cardSelector = "#card-template";

// image popup

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    () => {
      popupWithImage.open(cardData.link, cardData.name);
    },
    handleDeleteClick,
    handleIsLiked
  );
  return cardElement.getView();
}

// function renderCard(cardData) {
//   const cardElement = createCard(cardData);
//   cardSection.addItem(cardElement);
// }

// // new Api

let cardSection;

api
  .getInitialCards()
  .then((res) => {
    cardSection = new Section(
      {
        items: res,
        renderer: createCard,
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
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
