const hideError = (errorElement, inputErrorClass) => {
    errorElement.textContent = '';
    errorElement.classList.remove(inputErrorClass);
};

const showError = (errorElement, message, inputErrorClass) => {
    errorElement.textContent = message;
    errorElement.classList.add(inputErrorClass);
};

const toggleInputState = (inputField, options) => {
    const isValid = inputField.validity.valid;
    const inputSectionElement = inputField.closest(options.inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(options.inputErrorSelector);
    if (isValid) {
        hideError(errorElement, options.inputErrorClass);
    }
    else {
        showError(errorElement, inputField.validationMessage, options.inputErrorClass);
    }
}

const enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(disabledButtonClass);
};

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
    const formIsValid = inputs.every(inputField => inputField.validity.valid);

    if (formIsValid) {
        enableButton(submitElement, disabledButtonClass);
    } else {
        disableButton(submitElement, disabledButtonClass);
    };
};

const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));

    inputs.forEach(inputField => {
        inputField.addEventListener('input', () => {
            toggleInputState(inputField, options);
            toggleButtonState(inputs, submitElement, options.disabledButtonClass);
        });
    });

    toggleButtonState(inputs, submitElement, options.disabledButtonClass);
};

const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach(form => {
        setEventListeners(form, options);
    });
};