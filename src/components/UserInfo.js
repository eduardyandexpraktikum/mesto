export class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
        this.userId = _id;
    }

}