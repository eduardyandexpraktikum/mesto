export class Card {

    constructor(userId, data, handleCardClick, handleDeletePopup, handlePutLike, handleDeleteLike) {
        this._id = userId;
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._likeCounter = data.likes;
        this._cardCreator = data.owner;
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
        this._likeButton.addEventListener('click', this.likeToggle);
        this._binButton.addEventListener('click', () => { this._handleDeletePopup(this._cardId, this._element) });
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    likeToggle() {
        if (!this._likeButton.classList.contains('element__like_active')) {
            this._handlePutLike(this);
        }
        else {
            this._handleDeleteLike(this);
        }
    }

    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }

    generate() {
        this._element = this._getTemplate();
        this._binButton = this._element.querySelector('.element__bin');
        this._likeButton = this._element.querySelector('.element__like');
        console.log(JSON.stringify(this._id))
        console.log(this._id)

        this._id === this._data.owner._id ? this._binButton.style.display = "" : "none";

        this._element.querySelector('.element__description').textContent = this._name;
        this._element.querySelector('.element__likecounter').textContent = this._likeCounter.length;

        this._cardImage = this._element.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setListeners();
        return this._element;
    }
}