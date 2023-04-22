export class FormValidator {
    constructor(options, form) {
        this._form = form
        //this._formSelector = options.formSelector
        this._submitSelector = options.submitSelector
        this._inputSelector = options.inputSelector
        this._inputSectionSelector = options.inputSectionSelector
        this._inputErrorSelector = options.inputErrorSelector //span - текст под инпутом
        this._disabledButtonClass = options.disabledButtonClass
        this._inputErrorClass = options.inputErrorClass
        this._submitElement = form.querySelector(this._submitSelector);
        this._inputs = Array.from(form.querySelectorAll(this._inputSelector));
    }

    _hideError = (errorElement, inputErrorClass) => {
        errorElement.textContent = '';
        errorElement.classList.remove(inputErrorClass);
    };

    _showError = (errorElement, message, inputErrorClass) => {
        errorElement.textContent = message;
        errorElement.classList.add(inputErrorClass);
    };

    _toggleInputState = (inputField) => {
        const isValid = inputField.validity.valid;
        const inputSectionElement = inputField.closest(this._inputSectionSelector);
        const errorElement = inputSectionElement.querySelector(this._inputErrorSelector);
        if (isValid) {
            this._hideError(errorElement, this._inputErrorClass);
        }
        else {
            this._showError(errorElement, inputField.validationMessage, this._inputErrorClass);
        }
    }

    _enableButton = () => {
        this._submitElement.removeAttribute('disabled');
        this._submitElement.classList.remove(this._disabledButtonClass);
    };

    disableButton = () => {
        this._submitElement.setAttribute('disabled', true);
        this._submitElement.classList.add(this._disabledButtonClass);
    };

    toggleButtonState = () => {

        if (this._inputs.every(inputField => inputField.validity.valid)) {
            this._enableButton();
        } else {
            this.disableButton();
        };
    };

    _setEventListeners = () => {

        this._inputs.forEach(inputField => {
            inputField.addEventListener('input', () => {
                this._toggleInputState(inputField);
                this.toggleButtonState(this._disabledButtonClass);
            });
        });

        this.toggleButtonState(this._disabledButtonClass);
    };

    enableValidation = () => {
        this._setEventListeners();
    };
}