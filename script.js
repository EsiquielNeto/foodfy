const overlayModal = document.querySelector('.overlay-modal');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener('click', function() {
        const recipeId = card.getAttribute('id');
        overlayModal.classList.add('active');
        overlayModal.querySelector('img').src = `assets/${recipeId}`
        overlayModal.querySelector('h2').innerHTML = card.querySelector('h3').innerHTML;
        overlayModal.querySelector('p').innerHTML = card.querySelector('p').innerHTML;

    });
}

document.querySelector('.close-modal').addEventListener('click', function() {
    overlayModal.classList.remove('active');
    overlayModal.querySelector('img').src = '';
})