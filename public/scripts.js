const accordion = document.querySelectorAll(".accordion__button");
const content = document.querySelectorAll(".accordion__content")

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {

        if (content[i].classList.contains('hide')) {
            content[i].classList.remove('hide');
            accordion[i].innerHTML = 'ESCONDER';

        } else {
            content[i].classList.add('hide');
            accordion[i].innerHTML = 'MOSTRAR';

        }
    });
}

function addIngredient() {
    const ingredients = document.querySelector('#ingredients');
    const fieldContainer = document.querySelectorAll('.ingredient');

    const newFiled = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newFiled.children[0] == '') {
        return false;
    }

    newFiled.children[0].value = '';
    ingredients.appendChild(newFiled);
}

function addStep() {
    const steps = document.querySelector('#steps');
    const fieldContainer = document.querySelectorAll('.step');

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0] == '') {
        return false;
    }

    newField.children[0].value = '';
    steps.appendChild(newField);
}

document
    .querySelector('.add_ingredients')
    .addEventListener('click', addIngredient);

document
    .querySelector('.add_steps')
    .addEventListener('click', addStep);