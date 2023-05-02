import './index.css';
import { Api } from '../components/Api.js';
import { initialCards } from '../utils/feed.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const nameChange = document.querySelector('.popup__inputs_field_name');
const descriptionChange = document.querySelector('.popup__inputs_field_description');
const addButton = document.querySelector('.profile__add');
const formAdd = document.querySelector('#addPopupForm');
const formEdit = document.querySelector('#editPopupForm');
const formAvatar = document.querySelector('#avatarPopupForm')
const editAvatarButton = document.querySelector('.profile__cover');

const options = {
    formSelector: '.popup__form',
    submitSelector: '.popup__confirm',
    inputSelector: '.popup__inputs',
    inputSectionSelector: '.popup__inputSection',
    inputErrorSelector: '.popup__input-error', //span - текст под инпутом
    disabledButtonClass: 'popup__confirm_inactive',
    inputErrorClass: 'popup__input-error_active'
};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '7a630e5f-f0b7-4c93-a00f-a1198348af6d',
        'Content-Type': 'application/json'
    }
});


Promise.all([api.getUserinfo(), api.getInitialCards()])
    .then(([result1, result2]) => {
        userInformation.setUserInfo(result1);
        cardSection.renderItems(result2);
    })
    .catch(console.log);


function makeCard(data) {

    const card = new Card(
        userInformation.userId,
        data,
        () => { cardImagePopup.open(data.name, data.link); },
        (dataCard) => cardDeletePopup.open(dataCard),
        handlePutLike,
        handleDeleteLike
    )
    return card.generate();
};

const handlePutLike = (card) => {
    api.putLike(card.cardId)
        .then((res) => card.toggleLike(res))
        .catch(console.log)
}

const handleDeleteLike = (card) => {
    api.deleteLike(card.cardId)
        .then((res) => card.toggleLike(res))
        .catch(console.log)
}

const handleEditFormSubmit = (formValues) => {
    editInfo.renderLoading(true);
    api.patchUserInfo(formValues)
        .then((res) => {
            userInformation.setUserInfo(res);
            editInfo.close();
        })
        .catch(console.log)
        .finally(() => {
            editInfo.renderLoading(false);
        });
};

const handleChangeAvatar = (avatar) => {
    changeAvatarForm.renderLoading(true);
    console.log(changeAvatarForm.renderLoading())
    api.patchAvatar(avatar)
        .then((res) => {
            userInformation.setUserInfo(res)
            changeAvatarForm.close();
        })
        .catch(console.log)
        .finally(() => {
            changeAvatarForm.renderLoading(false);
        })
};

const handleAddFormSubmit = (data) => {
    addForm.renderLoading(true);
    api.postNewCard(data.name, data.link)
        .then((res) => {
            cardSection.addItemBackwards(makeCard(res));
            addForm.close();
        })
        .catch(console.log)
        .finally(() => {
            addForm.renderLoading(false);
        })
};


addButton.addEventListener('click', () => {
    validationAddForm.disableButton();
    addForm.open();
});


const cardDeletePopup = new PopupWithConfirmation('.popupDeleteCard', (card) => {
    cardDeletePopup.renderLoading(true);
    console.log(card)
    console.log(card.deleteCard())
    api.deleteCard(cardDeletePopup.cardId)
        .then(() => {
            card.deleteCard();
            cardDeletePopup.close();
        })
        .catch(console.log)
        .finally(() => {
            cardDeletePopup.renderLoading(false);
        });
})
cardDeletePopup.setEventListeners();


const validationAddForm = new FormValidator(options, formAdd);
validationAddForm.enableValidation();

const validationEditForm = new FormValidator(options, formEdit);
validationEditForm.enableValidation();

const validationAvatarForm = new FormValidator(options, formAvatar);
validationAvatarForm.enableValidation();

const changeAvatarForm = new PopupWithForm('#avatarPopup', handleChangeAvatar);
changeAvatarForm.setEventListeners();
editAvatarButton.addEventListener('click', () => {
    validationAvatarForm.disableButton();
    changeAvatarForm.open();
});

const addForm = new PopupWithForm("#addPopup", handleAddFormSubmit);
addForm.setEventListeners();

const cardSection = new Section(makeCard, '.elements');
const userInformation = new UserInfo({ name: '.profile__name', about: '.profile__description', avatar: '.profile__avatar' });

const cardImagePopup = new PopupWithImage('.popupImage');
cardImagePopup.setEventListeners();

const editInfo = new PopupWithForm(".popupEdit", handleEditFormSubmit);
editInfo.setEventListeners();

editButton.addEventListener('click', () => {
    const values = userInformation.getUserInfo();
    nameChange.value = values.name;
    descriptionChange.value = values.about;
    validationEditForm.toggleButtonState();
    editInfo.open();
});
