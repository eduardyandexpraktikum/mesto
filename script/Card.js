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
        this._element.querySelector('.element__like').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });

        this._element.querySelector('.element__bin').addEventListener('click', function (evt) {
            evt.target.closest('.element').remove();
        });

        this._element.querySelector('.element__image').addEventListener('click', function (evt) {
            imagePopupPic.src = evt.target.src;
            imagePopupPic.alt = evt.target.alt;
            imagePopupDescription.textContent = evt.target.alt;
            openPopup(imagePopup);
        });
    }

    createCard(name, link) {
        this._element = this._getTemplate();
        this._element.querySelector('.element__description').textContent = name;
        const cardImage = this._element.querySelector('.element__image');
        cardImage.src = link;
        cardImage.alt = name;
        this._setListeners();
        return this._element;
    }

    generate() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__description').textContent = this._name;
        const cardImage = this._element.querySelector('.element__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._setListeners();
        return this._element;
    }
}