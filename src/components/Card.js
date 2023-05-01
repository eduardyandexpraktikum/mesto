export class Card {

    constructor(userId, data, handleCardClick, handleDeletePopup, handlePutLike, handleDeleteLike) {
        this._id = userId;
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this.cardId = data._id;
        this._likeCounter = data.likes;
        this._cardCreator = data.owner;
        this._handleCardClick = handleCardClick;
        this._handleDeletePopup = handleDeletePopup;
        this._handlePutLike = handlePutLike;
        this._handleDeleteLike = handleDeleteLike;
    }

    _getTemplate() {
        this.cardElement = document
            .querySelector('.newElement')
            .content
            .querySelector('.element')
            .cloneNode(true);
        this._binButton = this.cardElement.querySelector('.element__bin');
        this._likeButton = this.cardElement.querySelector('.element__like');
        this._cardImage = this.cardElement.querySelector('.element__image');
        this._likeAmount = this.cardElement.querySelector('.element__likecounter')
        return this.cardElement;

    }

    _setListeners() {
        this._likeButton.addEventListener('click', () => { this.likeToggle(this) });
        this._binButton.addEventListener('click', () => {
            this._handleDeletePopup(this.cardId, this.cardElement)
        });
        this._cardImage.addEventListener('click', this._handleCardClick);
    }


    deleteCard() {
        this.cardElement.remove();
    }

    toggleLike(res) {
        this._likeButton.classList.toggle("element__like_active");
        this._likeAmount.textContent = res.likes.length;
    }

    likeToggle() {
        if (!this._likeButton.classList.contains('element__like_active')) {
            this._handlePutLike(this);
        }
        else {
            this._handleDeleteLike(this);
        }
    }

    generate() {
        this._getTemplate();

        if (this._id !== this._cardCreator._id) {
            this._binButton.style.display = "none"
        }

        if (this._likeCounter.some(item => {
            return item._id === this._id;
        })) {
            this._likeButton.classList.add("element__like_active")
        }

        this.cardElement.querySelector('.element__description').textContent = this._name;
        this.cardElement.querySelector('.element__likecounter').textContent = this._likeCounter.length;

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setListeners();
        return this.cardElement;
    }
}