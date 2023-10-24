import bishBosh from "./bish-bosh.js";
import setAddNewList from "./todo-list.js";

const controls = document.querySelector('#controls');
const output = document.querySelector('#output');
const select = document.querySelector('#functionality');

setBishBosh1('Bish Bosh 1.0');

select.addEventListener('change', function (e) {
    const value = e.target.value;

    switch (value) {
        case 'bb1':
            setBishBosh1(e.target.options[e.target.selectedIndex].text);
            break;
        case 'bb2':
            setBishBosh2(e.target.options[e.target.selectedIndex].text);
            break;
        case 'tdl':
            output.textContent = '';
            setAddNewList(controls, output);
            break;
    }
});

function setBishBosh1(functionalityName){

    const button = createBishBoshButton();

    controls.innerHTML = button;

    

    controls.querySelector('#run')
    .addEventListener('click',
     () => bishBoshFunction(functionalityName, 3, 4, 100));
}

function setBishBosh2(functionalityName){

    const bb2InputControls = `<div style="max-width: 350px;">
    <div class="row mt-3">
        <div class="col-sm-4"><label for="bish" class="form-label">Bish number</label></div>
        <div class="col-sm-8">
            <input type="number" id="bish" min="1">
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-sm-4"><label for="bosh" class="form-label">Bosh number</label></div>
        <div class="col-sm-8">
            <input type="number" id="bosh" min="1">
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-sm-4"><label for="length" class="form-label">Length</label></div>
        <div class="col-sm-8">
            <input type="number" id="length"  min="1">
        </div>
    </div>
</div>`

    const button = `<div class="col-12 col-md-4">
    ${createBishBoshButton()}
</div>`;

    controls.innerHTML = bb2InputControls + button;

    controls.querySelector('#run')
    .addEventListener('click',
    buttonAction);

    function buttonAction() {
        const bish = document.getElementById('bish').value;
        const bosh = document.getElementById('bosh').value;
        const length = document.getElementById('length').value;

        bishBoshFunction(functionalityName, bish, bosh, length);
    }
}

function bishBoshFunction(name, bish, bosh, length) {
    const array = bishBosh(bish, bosh, length);
    const items = `<li class="list-group-item">${array.join('</li>\n<li class="list-group-item">')}</li>`;
    output.innerHTML = `${name} output:\n<ul class="list-group list-group-flush">${items}</ul>`
}

function createBishBoshButton(){
    return '<button id="run" class="mt-3 btn btn-primary" type="button">Run</button>';
}