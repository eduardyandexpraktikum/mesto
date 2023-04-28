export class Section {
    constructor(renderer, selector) {
        this._renderer = renderer
        this._container = document.querySelector(selector)
    }

    renderItems(data) {
        this.data = data
        this.data.forEach(data => {
            this.addItem(this._renderer(data));
        });
    }

    addItem(element) {
        this._container.append(element);
    }

    addItemBackwards(element) {
        this._container.prepend(element);
    }
}