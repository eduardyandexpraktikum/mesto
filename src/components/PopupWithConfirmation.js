import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector, handleDeleteCard) {
        super(selector);
        this._handleDeleteCard = handleDeleteCard;
        this._deleteConfirmButton = this._popup.querySelector('#buttonDeleteCard');
        this._deleteConfirmButtonLoading = this._deleteConfirmButton.textContent;
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
        this._deleteConfirmButton.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteCard();
            this._popup.close();
        });
    }

    open(cardId, cardElement) {
        this.renderLoading(false);
        super.open();
        this.cardId = cardId;
        this.cardElement = cardElement;
        this._deleteConfirmButton.addEventListener("click", this._handleDeleteCard);
    }

    close() {
        super.close();
        this._deleteConfirmButton.removeEventListener("click", this._handleDeleteCard);
    }
}