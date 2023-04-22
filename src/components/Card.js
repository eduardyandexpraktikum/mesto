export class Card {

    constructor(name, link, handleCardClick) {
        this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
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

        this._element.querySelector('.element__bin').addEventListener('click', this._deleteCard);

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
        this._element.querySelector('.element__description').textContent = this._name;
        this._cardImage = this._element.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setListeners();
        return this._element;
    }
}