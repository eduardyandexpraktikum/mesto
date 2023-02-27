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

let nameLabel = document.querySelector('.profile__name');
let descriptionLabel = document.querySelector('.profile__description');
let nameChange = document.querySelector('.popup__inputs_field_name');
let descriptionChange = document.querySelector('.popup__inputs_field_description');

const popupAddItem = document.querySelector('.popupAddItem');
const closePopupAddItem = document.querySelector('.popupAddItem__close');
const addButton = document.querySelector('.profile__add');
const formAdd = document.querySelector('.popupAddItem__form');

let feed = document.querySelector('.elements');
const template = document.querySelector('.newElement');
const imagePopup = document.querySelector('.popupImage');
const imagePopupPic = document.querySelector('.popupImage__pic');
const imagePopupDescription = document.querySelector('.popupImage__description');
const closeImagePopup = document.querySelector('.popupImage__close');
const nameAdd = document.querySelector('.popupAddItem__inputs_field_name');
const linkAdd = document.querySelector('.popupAddItem__inputs_field_link');


const drawFeed = () => {
    let addCard = (item) => {
        const newCard = template.content.cloneNode(true);
        const newCardName = newCard.querySelector('.element__description');
        const newCardLink = newCard.querySelector('.element__image');
        newCardName.textContent = item.name;
        newCardLink.src = item.link;

        newCard.querySelector('.element__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });
        newCard.querySelector('.element__bin').addEventListener('click', function (evt) {
            evt.target.closest('.element').remove();
        });
        newCard.querySelector('.element__image').addEventListener('click', function (evt) {
            imagePopupPic.src = newCardLink.src;
            imagePopupDescription.textContent = newCardName.textContent;
            imagePopup.classList.toggle('popupImage_opened');
        });
        closeImagePopup.addEventListener('click', function (evt) {
            imagePopup.classList.remove('popupImage_opened');
        });
        return newCard;
    }

    const elementFeed = initialCards.map(addCard);

    elementFeed.forEach(element => {
        feed.prepend(element)
    });
};

drawFeed();

const addElement = (evt) => {
    evt.preventDefault();
    let newObject = { name: nameAdd.value, link: linkAdd.value };
    initialCards.push(newObject);
    feed.innerHTML = '';
    drawFeed();
    togglePopupAddItem();
}

const togglePopupEdit = () => {
    popup.classList.toggle('popup_opened');
}

const handleEditButtonClick = () => {
    nameChange.value = nameLabel.textContent;
    descriptionChange.value = descriptionLabel.textContent;
    togglePopupEdit();
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    togglePopupEdit();
    nameLabel.textContent = nameChange.value;
    descriptionLabel.textContent = descriptionChange.value;
}

const togglePopupAddItem = () => {
    popupAddItem.classList.toggle('popupAddItem__opened');
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
closePopup.addEventListener('click', togglePopupEdit);

closePopupAddItem.addEventListener('click', togglePopupAddItem);
addButton.addEventListener('click', togglePopupAddItem);
formAdd.addEventListener('submit', addElement);