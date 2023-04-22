import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(selector, handleFormSubmit) {
        super(selector)
        this._form = this._popup.querySelector('.popup__form')
        this._handleFormSubmit = handleFormSubmit
        this._inputList = this._popup.querySelectorAll('.popup__inputs');
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
            this._handleFormSubmit(this._getInputValues());
            this._popup.close;
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
}