document.addEventListener('DOMContentLoaded', function() {
    createPokedex('pokedex1', 'Jugador 1');
    createPokedex('pokedex2', 'Jugador 2');

    document.getElementById('baraja1-button').disabled = true;
    document.getElementById('baraja2-button').disabled = true;

    document.getElementById('resultado-comparacion').textContent = '';
    document.getElementById('error-messages').textContent = '';
});

function createPokedex(containerId, player) {
    const pokedexContainer = document.getElementById(containerId);

    for (let i = 0; i < 5; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('pokemon-card');
        cardElement.textContent = 'Selecciona una carta';
        cardElement.setAttribute('data-index', i);
        cardElement.addEventListener('click', function() {
            elegirCarta(cardElement, containerId);
        });
        pokedexContainer.appendChild(cardElement);
    }
}

let selectedCard1 = null;
let selectedCard2 = null;

function elegirCarta(cardElement, containerId) {
    const cards = document.querySelectorAll(`#${containerId} .pokemon-card`);
    cards.forEach(card => card.classList.remove('selected'));

    cardElement.classList.add('selected');

    if (containerId === 'pokedex1') {
        selectedCard1 = cardElement;
        document.getElementById('baraja1-button').disabled = false;
    } else if (containerId === 'pokedex2') {
        selectedCard2 = cardElement;
        document.getElementById('baraja2-button').disabled = false;
    }

    document.getElementById('resultado-comparacion').textContent = '';
    document.getElementById('error-messages').textContent = '';
}
