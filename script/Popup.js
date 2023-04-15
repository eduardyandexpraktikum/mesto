export class Popup {
    constructor({ selector }) {
        this._selector = selector
    }

    open() {
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown', _handleEscClose);
    }

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', _handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(closeButton) {
        closeButton.addEventListener('click', this.close());
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                close();
            }
        })
    }
}