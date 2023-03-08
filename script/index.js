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
const editPopup = document.querySelector('.popupEdit');
const closePopup = document.querySelector('.popup__close');
const buttonClosePopupProfile = document.querySelector('.popupEdit__close');
const formElement = document.querySelector('.popup__form');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');
const nameChange = document.querySelector('.popup__inputs_field_name');
const descriptionChange = document.querySelector('.popup__inputs_field_description');

const popupAddItem = document.querySelector('.popupAdd');
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
        popupOpen(imagePopup);
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
    nameAdd.value = '';
    linkAdd.value = '';
    popupClose(popupAddItem);
};

buttonCloseImagePopup.addEventListener('click', function (evt) {
    popupClose(imagePopup);
});


const handleEditButtonClick = () => {
    nameChange.value = nameLabel.textContent;
    descriptionChange.value = descriptionLabel.textContent;
    popupOpen(editPopup);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    nameLabel.textContent = nameChange.value;
    descriptionLabel.textContent = descriptionChange.value;
    popupClose(editPopup);
}

const popupOpen = (spot) => {
    spot.classList.add('popup_opened');
}

const popupClose = (spot) => {
    spot.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleEditFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
buttonClosePopupProfile.addEventListener('click', () => {
    popupClose(editPopup);
});

buttonClosePopupAddItem.addEventListener('click', () => {
    popupClose(popupAddItem);
});

addButton.addEventListener('click', () => {
    popupOpen(popupAddItem);
});

formAdd.addEventListener('submit', addElement);