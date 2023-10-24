export class List {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.items = [];
    }

    #checkedItems = 0;
    get checkedItems() {
        return this.#checkedItems;
    }

    toggleItemCheck(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.checked = !item.checked;
            if (item.checked === true) {
                this.#checkedItems++;
            } else {
                this.#checkedItems--;
            }
            return true;
        }
        return false;
    }

    addItem(itemId, itemDescription) {
        let item = new ListItem(itemId, itemDescription);
        this.items.push(item);
        return item
    }
}

export class ListItem {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.checked = false;
    }
}