const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameLabel = document.querySelector('.profile__name');
let descriptionLabel = document.querySelector('.profile__description');
let nameChange = document.querySelector('.popup__inputs:first-of-type');
let descriptionChange = document.querySelector('.popup__inputs:last-of-type');

const togglePopupEdit = () => {
    popup.classList.toggle('popup_opened');
}

const handleEditButtonClick = () => {
    nameChange.value = nameLabel.textContent;
    descriptionChange.value = descriptionLabel.textContent;
    togglePopupEdit();
}

function handleFormSubmit(evt) {
    togglePopupEdit();
    nameLabel.textContent = nameChange.value;
    descriptionLabel.textContent = descriptionChange.value;
    evt.preventDefault();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
closePopup.addEventListener('click', togglePopupEdit);