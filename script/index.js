/*
import { initialCards } from './array';
*/

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');
const nameChange = document.querySelector('.popup__inputs_field_name');
const descriptionChange = document.querySelector('.popup__inputs_field_description');

const popupAddItem = document.querySelector('#addPopup');
const closePopupAddItem = document.querySelector('#addPopupClose');
const addButton = document.querySelector('.profile__add');
const formAdd = document.querySelector('#addPopupForm');

const feed = document.querySelector('.elements');
const template = document.querySelector('.newElement');
const imagePopup = document.querySelector('.popupImage');
const imagePopupPic = document.querySelector('.popupImage__pic');
const imagePopupDescription = document.querySelector('.popupImage__description');
const closeImagePopup = document.querySelector('.popupImage__close');
const nameAdd = document.querySelector('#addImageName');
const linkAdd = document.querySelector('#addImageLink');


const addCards = (item) => {
    const newCard = template.content.querySelector('.element').cloneNode(true);
    const newCardName = newCard.querySelector('.element__description');
    const newCardLink = newCard.querySelector('.element__image');

    newCardName.textContent = item.name;
    newCardLink.src = item.link;
    newCardLink.alt = item.name;
    newCard.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    newCard.querySelector('.element__bin').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    newCard.querySelector('.element__image').addEventListener('click', function (evt) {
        imagePopupPic.src = newCardLink.src;
        imagePopupPic.alt = item.name;
        imagePopupDescription.textContent = newCardName.textContent;
        imagePopup.classList.toggle('popupImage_opened');
    });

    return newCard;
}

const elementFeed = initialCards.map(addCards);

elementFeed.forEach(element => {
    feed.prepend(element)
});

const addElement = (evt) => {
    evt.preventDefault();
    const addCardFromLink = template.content.querySelector('.element').cloneNode(true);
    const addCardName = addCardFromLink.querySelector('.element__description');
    const addCardLink = addCardFromLink.querySelector('.element__image');
    addCardName.textContent = nameAdd.value;
    addCardLink.src = linkAdd.value;
    addCardLink.alt = nameAdd.value;
    feed.prepend(addCardFromLink);
    addCardFromLink.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    addCardFromLink.querySelector('.element__bin').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    addCardFromLink.querySelector('.element__image').addEventListener('click', function (evt) {
        imagePopupPic.src = addCardLink.src;
        imagePopupPic.alt = addCardName.textContent;
        imagePopupDescription.textContent = addCardName.textContent;
        imagePopup.classList.toggle('popupImage_opened');
    });
    nameAdd.value = '';
    linkAdd.value = '';
    togglePopupAddItem();
};

closeImagePopup.addEventListener('click', function (evt) {
    imagePopup.classList.remove('popupImage_opened');
});

const togglePopupEdit = () => {
    popup.classList.toggle('popup_opened');
}

const handleEditButtonClick = () => {
    nameChange.value = nameLabel.textContent;
    descriptionChange.value = descriptionLabel.textContent;
    togglePopupEdit();
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    nameLabel.textContent = nameChange.value;
    descriptionLabel.textContent = descriptionChange.value;
    togglePopupEdit();
}

const togglePopupAddItem = () => {
    popupAddItem.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', handleEditFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
closePopup.addEventListener('click', togglePopupEdit);

closePopupAddItem.addEventListener('click', togglePopupAddItem);
addButton.addEventListener('click', togglePopupAddItem);
formAdd.addEventListener('submit', addElement);