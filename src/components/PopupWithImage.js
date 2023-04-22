import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImageLink = this._popup.querySelector('.popupImage__pic')
        this._popupImageName = this._popup.querySelector('.popupImage__description')
    }

    open(name, link) {
        super.open();
        this._popupImageLink.src = link;
        this._popupImageLink.alt = name;
        this._popupImageName.textContent = name;
    }
}