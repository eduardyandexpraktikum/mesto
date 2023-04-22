import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImageLink = this._selector.querySelector('.popupImage__pic')
        this._popupImageName = this._selector.querySelector('.popupImage__description')
    }

    open(link, name) {
        super.open();
        this._popupImageLink.src = link;
        this._popupImageLink.alt = name;
        this._popupImageName.textContent = name;
    }
}