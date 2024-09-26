function verificarJugadoresListos() {
    if (jugador1Listo && jugador2Listo) {
        compararPokemon();
    }
}

function compararPokemon() {
    const pokedex1 = document.querySelectorAll('#pokedex1 .pokemon-card');
    const pokedex2 = document.querySelectorAll('#pokedex2 .pokemon-card');

    let poderMaxJugador1 = 0;
    let pokemonGanadorJugador1 = '';
    pokedex1.forEach(card => {
        const poder = parseInt(card.getAttribute('data-power'));
        if (poder > poderMaxJugador1) {
            poderMaxJugador1 = poder;
            pokemonGanadorJugador1 = card.getAttribute('data-name');
        }
    });

    let poderMaxJugador2 = 0;
    let pokemonGanadorJugador2 = '';
    pokedex2.forEach(card => {
        const poder = parseInt(card.getAttribute('data-power'));
        if (poder > poderMaxJugador2) {
            poderMaxJugador2 = poder;
            pokemonGanadorJugador2 = card.getAttribute('data-name');
        }
    });

    const resultadoBoton = document.getElementById('resultado-comparacion');

    if (poderMaxJugador1 > poderMaxJugador2) {
        resultadoBoton.innerHTML = `El ganador es el Jugador 1 con ${pokemonGanadorJugador1} (Poder: ${poderMaxJugador1})`;
    } else if (poderMaxJugador2 > poderMaxJugador1) {
        resultadoBoton.innerHTML = `El ganador es el Jugador 2 con ${pokemonGanadorJugador2} (Poder: ${poderMaxJugador2})`;
    } else {
        resultadoBoton.innerHTML = 'Es un empate';
    }

    // Mostrar el botón
    resultadoBoton.style.display = 'block';

    // Ocultar el botón después de un tiempo
    setTimeout(() => {
        resultadoBoton.style.display = 'none'; // Esconde el botón
    }, 5000); // Ajusta el tiempo como desees
}
