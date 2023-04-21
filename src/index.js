//import './pages/index.css';
import { initialCards } from './script/feed.js';
import { Card } from './script/Card.js';
import { FormValidator } from './script/FormValidator.js';
import { Section } from './script/Section.js';
import { Popup } from './script/Popup.js';
import { PopupWithForm } from './script/PopupWithForm.js';
import { PopupWithImage } from './script/PopupWithImage.js';
import { UserInfo } from './script/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const popups = Array.from(document.querySelectorAll('.popup'));
const editPopup = document.querySelector('.popupEdit');
const popupClose = document.querySelector('.popup__close');
const closeButtons = document.querySelectorAll('.popup__close');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');
const nameChange = document.querySelector('.popup__inputs_field_name');
const descriptionChange = document.querySelector('.popup__inputs_field_description');

const popupAddItem = document.querySelector('.popupAdd');
const buttonAddItem = popupAddItem.querySelector('#buttonAddItem');
const addButton = document.querySelector('.profile__add');
const formAdd = document.querySelector('#addPopupForm');
const formEdit = document.querySelector('#editPopupForm')

const feed = document.querySelector('.elements');
const template = document.querySelector('.newElement');
const imagePopup = document.querySelector('.popupImage');
const imagePopupPic = document.querySelector('.popupImage__pic');
const imagePopupDescription = document.querySelector('.popupImage__description');
const buttonCloseImagePopup = document.querySelector('.popupImage__close');
const nameAdd = document.querySelector('#addImageName');
const linkAdd = document.querySelector('#addImageLink');


const createCard = (name, link) => {
    const card = new Card(name, link);
    return card.generate();
};

formEdit.addEventListener('submit', () => { });
editButton.addEventListener('click', () => { });

const handleAddFormSubmit = () => {
    feed.prepend(createCard(nameAdd.value, linkAdd.value));
    addForm.close();
};

const addForm = new PopupWithForm(popupAddItem, handleAddFormSubmit);
addButton.addEventListener('click', () => {
    formAdd.reset();
    addForm.setEventListeners();
    validationAddForm.disableButton();
    addForm.open();
});

const userInformation = new UserInfo(nameLabel, descriptionLabel)

const handleEditFormSubmit = () => {
    editInfo.close();
    userInformation.setUserInfo(nameChange.value, descriptionChange.value);
};

const editInfo = new PopupWithForm(editPopup, handleEditFormSubmit);
editButton.addEventListener('click', () => {
    editInfo.setEventListeners();
    const values = userInformation.getUserInfo();
    nameChange.value = values.name;
    descriptionChange.value = values.description;
    validationEditForm._toggleButtonState();
    editInfo.open();
});

const cardImagePopup = new PopupWithImage(imagePopup);
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

const makeCard = (item) => {
    const card = new Card(item.name, item.link, () => {
        cardImagePopup.open(item.link, item.name);
    });
    const cardElement = card.generate();
    return cardElement;
};

const cardSection = new Section({ items: initialCards, renderer: makeCard }, feed)
cardSection.renderItems();

const validationAddForm = new FormValidator(options, formAdd);
validationAddForm.enableValidation();

const validationEditForm = new FormValidator(options, formEdit);
validationEditForm.enableValidation();