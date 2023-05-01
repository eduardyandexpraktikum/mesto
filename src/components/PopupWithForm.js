import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(selector, handleFormSubmit) {
        super(selector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__inputs');
        this._submitButton = this._popup.querySelector('.popup__confirm');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._handleFormSubmit(this._getInputValues());
        });
    }

    renderLoading(isLoading) {

        if (isLoading) {
            this._submitButton.textContent = "Сохранение…";
            this._submitButton.disabled = true;
        }
        else {
            this._submitButton.textContent = this._submitButtonText;
            this._submitButton.disabled = false;
        }
    }

    close() {
        this._form.reset();
        super.close();
    }
}