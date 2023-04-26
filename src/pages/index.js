import './index.css';
import { initialCards } from '../utils/feed.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');

const nameChange = document.querySelector('.popup__inputs_field_name');
const descriptionChange = document.querySelector('.popup__inputs_field_description');

const addButton = document.querySelector('.profile__add');
const formAdd = document.querySelector('#addPopupForm');
const formEdit = document.querySelector('#editPopupForm')

const handleAddFormSubmit = (formValues) => {
    console.log(formValues)
    cardSection.addItem(makeCard(formValues));
    addForm.close();
};

const addForm = new PopupWithForm("#addPopup", handleAddFormSubmit);
addForm.setEventListeners();
addButton.addEventListener('click', () => {
    validationAddForm.disableButton();
    addForm.open();
});

const userInformation = new UserInfo('.profile__name', '.profile__description')

const handleEditFormSubmit = (formValues) => {
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

const makeCard = (item) => {
    const card = new Card(item.name, item.link, () => {
        cardImagePopup.open(item.name, item.link);
    });
    const cardElement = card.generate();
    return cardElement;
};

const cardSection = new Section({ items: initialCards, renderer: makeCard }, '.elements')
cardSection.renderItems();

const validationAddForm = new FormValidator(options, formAdd);
validationAddForm.enableValidation();

const validationEditForm = new FormValidator(options, formEdit);
validationEditForm.enableValidation();

// 7a630e5f-f0b7-4c93-a00f-a1198348af6d
// cohort-64