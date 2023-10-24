import { List } from "./List.js";
import validateForm from "./form-validation.js";

let listCount = 0;
let itemCount = 0;

let currentList;

const lists = [];
let doc;
let output;

export default function setAddNewList(controls, output) {
    doc = controls;
    output = output;

    doc.innerHTML = createAddListFormList();

    const inputName = doc.querySelector('#name');
    const form = doc.querySelector('#new-list-form');
    const addButton = doc.querySelector('#add-list');
    addButton.addEventListener('click', addListButtonAction, false);

    function addListButtonAction(event) {
        event.preventDefault();

        if (!validateForm(form)) {
            return;
        }
        createJSList();

        const addItemForm = createAddItemForm();

        doc.querySelector('#add-items-container').innerHTML = addItemForm;

        setAddItemListeners();

        function createJSList() {
            lists.push(currentList = new List(getListId(), inputName.value));
        }
    }
}

function createAddListFormList(){
    return `<div class="row">
    <div>
        <h1 class="h3 fw-light mt-3">New ToDo List</h1>
        <div class="row px-3">
            <div class="card px-0 w-auto">
                <div class="card-body bg-body-tertiary">
                    <div class="row align-items-center">
                        <div class="col-12">
                            <label for="name" class="form-label">List name</label>
                        </div>
                        <div class="col ps-1">
                            <form id="new-list-form" class="needs-validation" novalidate>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" placeholder="name" id="name" required>
                                    <button type="submit" id="add-list"
                                        class="btn btn-secondary input-group-text bi bi-plus-circle ms-2 rounded"></button>
                                    <div class="invalid-feedback">
                                        Name is required.
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="add-items-container">
    </div>
</div>`;
}

function setAddItemListeners() {
    let doc = document;

    const addItemButton = doc.querySelector('#add-item');
    const listContainer = doc.querySelector('#item-list');
    const inputDescription = doc.querySelector('#item-description');
    const form = doc.querySelector('#add-item-form');
    let itemList;

    addItemButton.addEventListener('click', addItemButtonAction, false);

    function addItemButtonAction(event) {
        event.preventDefault();

        if (!validateForm(form)) {
            return;
        }

        if (currentList.items.length === 0) {
            listContainer.innerHTML = createItemList();
            itemList = doc.querySelector('ul');
        }
        const item = currentList.addItem(getItemId(), inputDescription.value);
        const textLiItem = createItem(item);
        itemList.insertAdjacentHTML('beforeend', textLiItem)

        const htmlLiItem = itemList.querySelector(`#item-${item.id}`);

        const removeButton = htmlLiItem.querySelector('.btn-remove')
        removeButton.addEventListener('click', removeButtonAction);

        const checkBox = htmlLiItem.querySelector('input')
        checkBox.addEventListener('change', checkboxAction);

        function removeButtonAction(e) {
            const li = e.target.closest('li');
            const id = parseInt(li.getAttribute('data-tdl-item-id'));

            let index = currentList.items.findIndex((i) => i.id === id);
            if (index !== -1) {
                currentList.items.splice(index, 1);
            }
            e.target.closest('li').remove();

        }

        function checkboxAction(e) {
            const li = e.target.closest('li');
            const label = li.querySelector('label');

            const id = parseInt(li.getAttribute('data-tdl-item-id'));

            let index = currentList.items.findIndex((i) => i.id === id);
            if (index !== -1) {
                currentList.toggleItemCheck(id);
            }

            label.classList.toggle("done");
        }
    }


}

function createItem(item) {
    return `<li id="item-${item.id}" data-tdl-item-id="${item.id}" class="list-group-item">
    <div class="input-group has-validation flex-nowrap">
        <div class="col-auto">
            <input class="form-check-input me-2" type="checkbox" value=""
                id="checkox-${item.id}">
        </div>
        <div class="w-100 overflow-auto">
            <label class="form-check-label w-100" 
                for="checkox-${item.id}">${item.description}</label>
        </div>
        <div class="col-auto">
            <button
                class="btn-remove btn btn-danger input-group-text bi bi-trash ms-2 rounded py-0 px-1"></button>
        </div>
    </div>
</li>`;
}

function createItemList() {
    return '<ul class="list-group px-2 mt-3"></ul>';
}

function createAddItemForm() {
    return `<h2 class="h4 fw-light mt-3">Items</h2>
    <div class="row px-3">
        <div class="card px-0">
            <div class="card-header">
                ${currentList.name}
            </div>
            <div class="card-body bg-body-tertiary">
                <div class="row align-items-center">
                    <div class="col-12">
                        <label for="item-description" class="form-label">New item</label>
                    </div>
                    <div class="col ps-1">
                        <form id="add-item-form" class="needs-validation" novalidate>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" placeholder="description" id="item-description"
                                    style="min-width: 100px; max-width: 350px;" required>
                                <button type="submit" id="add-item"
                                    class="btn btn-secondary input-group-text bi bi-plus-circle ms-2 rounded"></button>
                                <div class="invalid-feedback">
                                    Description is required.
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="item-list" class="row">
                </div>
            </div>
        </div>
    </div>`;
}

function getListId() {
    return ++listCount;
}

function getItemId() {
    return ++itemCount;
}

