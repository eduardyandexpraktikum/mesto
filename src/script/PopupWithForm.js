import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(element, handleFormSubmit) {
        super(element)
        this._form = this._element.querySelector('.popup__form')
        this._handleFormSubmit = handleFormSubmit
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__inputs');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
}