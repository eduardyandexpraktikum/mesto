import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(element) {
        super(element)
        this._popupImageLink = this._element.querySelector('.popupImage__pic')
        this._popupImageName = this._element.querySelector('.popupImage__description')
    }

    open(link, name) {
        super.open();
        this._popupImageLink.src = link;
        this._popupImageLink.alt = name;
        this._popupImageName.textContent = name;
    }
}