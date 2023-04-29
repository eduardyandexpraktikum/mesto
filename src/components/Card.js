export class Card {

    constructor(id, data, handleCardClick, handleDeletePopup, handlePutLike, handleDeleteLike) {
        this._id = id;
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._likeCounter = data.likes;
        this._cardCreator = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleDeletePopup = handleDeletePopup;
        this._handlePutLike = handlePutLike;
        this._handleDeleteLike = handleDeleteLike;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.newElement')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setListeners() {
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._binButton.addEventListener('click', () => { this._handleDeletePopup(this._cardId, this._element) });
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    _likeCard(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }

    generate() {
        this._element = this._getTemplate();
        this._binButton = this._element.querySelector('.element__bin');
        this._id !== this._cardCreator ? this._binButton.style.display = "none" : "";
        this._element.querySelector('.element__description').textContent = this._name;
        this._element.querySelector('.element__likecounter').textContent = this._likeCounter.length;
        this._cardImage = this._element.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setListeners();
        return this._element;
    }
}