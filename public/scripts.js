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