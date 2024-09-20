

document.getElementById('baraja1-button').addEventListener('click', function() {
    if (selectedCard1) {
        fetchAndRevealSelectedPokemon('pokedex1', selectedCard1, 'baraja1-button');
    } else {
        mostrarError('Jugador 1 debe seleccionar una carta antes de barajar.');
    }
});

function fetchAndRevealSelectedPokemon(containerId, selectedCard, buttonId) {
    const randomId = generateRandomIds(1)[0];
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon no encontrado: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            updateSelectedCard(data, selectedCard);
           
            document.getElementById(buttonId).disabled = true;

           
            if (selectedCard2 && selectedCard2.getAttribute('data-power')) {
                compararPokemon();
            }
        })
        .catch(error => {
            mostrarError(`Error al cargar el Pokémon: ${error.message}`);
        });
}

function generateRandomIds(count) {
    const randomIds = [];
    for (let i = 0; i < count; i++) {
        randomIds.push(Math.floor(Math.random() * 898) + 1);
    }
    return randomIds;
}

function updateSelectedCard(pokemonData, selectedCard) {
    selectedCard.innerHTML = '';

    const imgElement = document.createElement('img');
    imgElement.src = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default;
    imgElement.alt = pokemonData.name;
    imgElement.classList.add('pokemon-img');

    const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');

    const infoElement = document.createElement('p');
    infoElement.textContent = `Nombre: ${pokemonData.name} | Altura: ${pokemonData.height / 10} m | Peso: ${pokemonData.weight / 10} kg | Tipos: ${types}`;

    selectedCard.appendChild(imgElement);
    selectedCard.appendChild(infoElement);

    const elementValue = getElementValue(pokemonData.types[0].type.name);
    const nivelPoder = calcularValor(pokemonData.height / 10, pokemonData.weight / 10, elementValue);

    const powerElement = document.createElement('p');
    powerElement.textContent = `Nivel de Poder: ${nivelPoder}`;
    selectedCard.appendChild(powerElement);

    selectedCard.setAttribute('data-power', nivelPoder);
    selectedCard.setAttribute('data-name', pokemonData.name);
}

function getElementValue(type) {
    const powerValues = {
        fire: 13,
        water: 8,
        electric: 8,
        rock: 13,
        plant: 21,
        steel: 8,
        grass: 34,
        bug: 34,
        dragon: 8,
        normal: 21,
        fighting: 8,
        ghost: 21,
        fairy: 8,
        ice: 21,
        psychic: 21,
        sinister: 13,
        earth: 13,
        flying: 21,
        poison: 13,
    };
    return powerValues[type] || 1;
}

function calcularValor(altura, peso, elemento) {
    return (altura * peso * 1.68) / elemento;
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-messages');
    errorDiv.textContent = mensaje;
}
