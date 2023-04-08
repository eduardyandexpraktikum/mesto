import { initialCards } from './feed.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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
export const imagePopup = document.querySelector('.popupImage');
export const imagePopupPic = document.querySelector('.popupImage__pic');
export const imagePopupDescription = document.querySelector('.popupImage__description');
const buttonCloseImagePopup = document.querySelector('.popupImage__close');
const nameAdd = document.querySelector('#addImageName');
const linkAdd = document.querySelector('#addImageLink');

const addElement = (evt) => {
    evt.preventDefault();
    feed.prepend(new Card().createCard(nameAdd.value, linkAdd.value));
    closePopup(popupAddItem);
};

buttonCloseImagePopup.addEventListener('click', function (evt) {
    closePopup(imagePopup);
});

const handleEditButtonClick = () => {
    nameChange.value = nameLabel.textContent;
    descriptionChange.value = descriptionLabel.textContent;
    openPopup(editPopup);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    nameLabel.textContent = nameChange.value;
    descriptionLabel.textContent = descriptionChange.value;
    closePopup(editPopup);
}

export const openPopup = (spot) => {
    spot.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

const closePopup = (spot) => {
    spot.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

formEdit.addEventListener('submit', handleEditFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

addButton.addEventListener('click', () => {
    formAdd.reset();
    openPopup(popupAddItem);
    validationAddForm.disableButton();
});

formAdd.addEventListener('submit', addElement);

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
})

const options = {
    formSelector: '.popup__form',
    submitSelector: '.popup__confirm',
    inputSelector: '.popup__inputs',
    inputSectionSelector: '.popup__inputSection',
    inputErrorSelector: '.popup__input-error', //span - текст под инпутом
    disabledButtonClass: 'popup__confirm_inactive',
    inputErrorClass: 'popup__input-error_active'
}

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generate();
    document.querySelector('.elements').prepend(cardElement);
});

const validationAddForm = new FormValidator(options, formAdd);
validationAddForm.enableValidation();

const validationEditForm = new FormValidator(options, formEdit);
validationEditForm.enableValidation();