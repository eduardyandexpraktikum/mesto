const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popups = Array.from(document.querySelectorAll('.popup'));
const editPopup = document.querySelector('.popupEdit');
const popupClose = document.querySelector('.popup__close');
const buttonClosePopupProfile = document.querySelector('.popupEdit__close');
const formElement = document.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');
const nameChange = document.querySelector('.popup__inputs_field_name');
const descriptionChange = document.querySelector('.popup__inputs_field_description');

const popupAddItem = document.querySelector('.popupAdd');
const buttonAddItem = popupAddItem.querySelector('#buttonAddItem');
const buttonClosePopupAddItem = document.querySelector('#addPopupClose');
const addButton = document.querySelector('.profile__add');
const formAdd = document.querySelector('#addPopupForm');

const feed = document.querySelector('.elements');
const template = document.querySelector('.newElement');
const imagePopup = document.querySelector('.popupImage');
const imagePopupPic = document.querySelector('.popupImage__pic');
const imagePopupDescription = document.querySelector('.popupImage__description');
const buttonCloseImagePopup = document.querySelector('.popupImage__close');
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
        openPopup(imagePopup);
    });

    return newCard;
}

const elementFeed = initialCards.map(addCards);

elementFeed.forEach(element => {
    feed.prepend(element)
});

const addElement = (evt) => {
    evt.preventDefault();
    const cardAddingObject = {};
    cardAddingObject.name = nameAdd.value;
    cardAddingObject.link = linkAdd.value;
    feed.prepend(addCards(cardAddingObject));
    evt.target.reset();
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

const openPopup = (spot) => {
    spot.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

const closePopup = (spot) => {
    spot.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

formElement.addEventListener('submit', handleEditFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

addButton.addEventListener('click', () => {
    nameAdd.value = '';
    linkAdd.value = '';
    openPopup(popupAddItem);
    buttonAddItem.classList.add(options.disabledButtonClass);
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

enableValidation(options);