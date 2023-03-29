export class FormValidator {
    constructor(options) {
        this._formSelector = options.formSelector
        this._submitSelector = options.submitSelector
        this._inputSelector = options.inputSelector
        this._inputSectionSelector = options.inputSectionSelector
        this._inputErrorSelector = options.inputErrorSelector //span - текст под инпутом
        this._disabledButtonClass = options.disabledButtonClass
        this._inputErrorClass = options.inputErrorClass
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

    _enableButton = (buttonElement, disabledButtonClass) => {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(disabledButtonClass);
    };

    _disableButton = (buttonElement, disabledButtonClass) => {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(disabledButtonClass);
    };

    _toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
        const formIsValid = inputs.every(inputField => inputField.validity.valid);

        if (formIsValid) {
            this._enableButton(submitElement, disabledButtonClass);
        } else {
            this._disableButton(submitElement, disabledButtonClass);
        };
    };

    _setEventListeners = (form) => {
        const submitElement = form.querySelector(this._submitSelector);
        const inputs = Array.from(form.querySelectorAll(this._inputSelector));

        inputs.forEach(inputField => {
            inputField.addEventListener('input', () => {
                this._toggleInputState(inputField);
                this._toggleButtonState(inputs, submitElement, this._disabledButtonClass);
            });
        });

        this._toggleButtonState(inputs, submitElement, this._disabledButtonClass);
    };

    enableValidation = () => {
        const forms = Array.from(document.querySelectorAll(this._formSelector));
        forms.forEach(form => {
            this._setEventListeners(form);
        });
    };
}


