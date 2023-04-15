export class Section {
    constructor({ items, renderer }, container) {
        this._items = items
        this._renderer = renderer
        this._container = container
    }

    renderItems() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}