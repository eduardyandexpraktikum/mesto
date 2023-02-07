const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const buttonConfirm = document.querySelector('.popup__confirm');

let formElement = document.querySelector('.popup__container');
let nameLabel = document.querySelector('.profile__name');
let descriptionLabel = document.querySelector('.profile__description');
let nameChange = document.querySelector('.popup__name-change');
let descriptionChange = document.querySelector('.popup__description-change');

nameChange.value = nameLabel.textContent;
descriptionChange.value = descriptionLabel.textContent;

const togglePopupEdit = () => {
    popup.classList.toggle('popup_opened');
}

const handleEditButtonClick = () => {
    togglePopupEdit();
}

const handleCloseButtonClick = () => {
    togglePopupEdit();
}

function handleFormSubmit(evt) {
    evt.preventDefault();
}

const handleConfirmButtonClick = () => {
    togglePopupEdit();
    nameChange.getAttribute('value');
    descriptionChange.getAttribute('value');
    nameLabel.textContent = nameChange.value;
    descriptionLabel.textContent = descriptionChange.value;
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
closePopup.addEventListener('click', handleCloseButtonClick);
buttonConfirm.addEventListener('click', handleConfirmButtonClick)