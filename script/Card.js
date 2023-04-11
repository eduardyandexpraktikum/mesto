import { openPopup, imagePopup, imagePopupPic, imagePopupDescription } from './index.js'

export class Card {

    constructor(name, link) {
        this._name = name;
        this._link = link;
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
        this._cardImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);

        this._element.querySelector('.element__bin').addEventListener('click', this._deleteCard);

        this._cardImage.addEventListener('click', this._cardClick);
    }

    _likeCard(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }

    _cardClick(evt) {
        imagePopupPic.src = evt.target.src;
        imagePopupPic.alt = evt.target.alt;
        imagePopupDescription.textContent = evt.target.alt;
        openPopup(imagePopup);
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