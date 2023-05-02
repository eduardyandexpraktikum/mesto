import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector, handleDeleteCard) {
        super(selector);
        this._handleDeleteCard = handleDeleteCard;
        this._deleteConfirmButton = this._popup.querySelector('#buttonDeleteCard');
        this._deleteConfirmButtonLoading = this._deleteConfirmButton.textContent;
        this._submitButton = this._popup.querySelector('.popup__confirm');
        this._defaultText = this._submitButton.textContent;
    }

    renderLoading(isLoading) {

        if (isLoading) {
            this._deleteConfirmButton.textContent = "Удаление…";
            this._deleteConfirmButton.disabled = true;
        }
        else {
            this._deleteConfirmButton.textContent = "Да";
            this._deleteConfirmButton.disabled = false;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._deleteConfirmButton.addEventListener("click", () => { this._handleDeleteCard(this.cardElement) });
    }

    open(card) {
        super.open();
        this.cardElement = card;
        this.cardId = this.cardElement._data._id;
    }


    close() {
        super.close();
        // this._deleteConfirmButton.removeEventListener("click", this._handleDeleteCard);
    }
}