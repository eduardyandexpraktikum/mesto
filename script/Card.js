import { initialCards } from './feed.js'
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

    render() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__description').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._setListeners();
        return this._element;
    }
}

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.render();
    document.querySelector('.elements').prepend(cardElement);
});