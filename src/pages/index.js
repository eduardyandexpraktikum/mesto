//import './index.css';
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

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '7a630e5f-f0b7-4c93-a00f-a1198348af6d',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getInitialCards, api.getUserinfo])
    .then((results) => {
        console.log(results);
    });

const cardImagePopup = new PopupWithImage('.popupImage');
cardImagePopup.setEventListeners();

const options = {
    formSelector: '.popup__form',
    submitSelector: '.popup__confirm',
    inputSelector: '.popup__inputs',
    inputSectionSelector: '.popup__inputSection',
    inputErrorSelector: '.popup__input-error', //span - текст под инпутом
    disabledButtonClass: 'popup__confirm_inactive',
    inputErrorClass: 'popup__input-error_active'
};

const makeCard = (data) => {
    const card = new Card(userInformation.userId,
        data,
        () => { cardImagePopup.open(data.name, data.link); },
        () => { cardDeletePopup.open(data._id, card); },
        () => { handlePutLike },
        () => { handleDeleteLike });
    const cardElement = card.generate();
    return cardElement;
};

const cardSection = new Section(makeCard, '.elements')
api.getInitialCards().then(data => {
    cardSection.renderItems(data);
});

const userInformation = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
api.getUserinfo().then(data => {
    userInformation.renderInfo(data.name, data.about, data.avatar, data._id);
})

const handleEditFormSubmit = (formValues) => {
    api.patchUserInfo(formValues.name, formValues.description);
    userInformation.setUserInfo(formValues.name, formValues.description);
    editInfo.close();
};

const editInfo = new PopupWithForm(".popupEdit", handleEditFormSubmit);
editInfo.setEventListeners();
editButton.addEventListener('click', () => {
    const values = userInformation.getUserInfo();
    nameChange.value = values.name;
    descriptionChange.value = values.description;
    validationEditForm.toggleButtonState();
    editInfo.open();
});

const handleAddFormSubmit = (formValues) => {
    console.log(formValues);
    api.postNewCard(formValues.name, formValues.link)
        .then((res) => {
            console.log(res)
        });
    cardSection.addItemBackwards(makeCard(formValues));
    addForm.close();
};

const addForm = new PopupWithForm("#addPopup", handleAddFormSubmit);
addForm.setEventListeners();
addButton.addEventListener('click', () => {
    validationAddForm.disableButton();
    addForm.open();
});

const handleChangeAvatar = (formValue) => {
    api.patchAvatar(formValue.link);
    userInformation.setAvatar(formValue.link);
    console.log(userInformation.setAvatar);
    console.log(formValue.link);
    changeAvatarForm.close();
};

const cardDeletePopup = new PopupWithConfirmation('.popupDeleteCard', () => {
    api.deleteCard(cardDeletePopup.card)
        .then(() => {
            cardDeletePopup.card.remove();
        })
        .catch(err => console.log(err));
    cardDeletePopup.close();
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