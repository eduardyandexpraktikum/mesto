export class UserInfo {
    constructor(nameSelector, descriptionSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    renderInfo(name, description, avatar, id) {
        this._name.textContent = name;
        this._description.textContent = description;
        this._avatar.src = avatar;
        this.userId = id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar.src,
        }
    }

    setUserInfo(name, description, avatar) {
        this._name.textContent = name;
        this._description.textContent = description;
        this._avatar.src = avatar;
    }

    setAvatar(avatar) {
        this._avatar = avatar;
    }

}