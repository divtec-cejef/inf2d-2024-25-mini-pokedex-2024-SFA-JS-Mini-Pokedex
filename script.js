/**
 * Exercice : Mini Pokédex
 * @author Steve Fallet <steve.fallet@dvitec.ch>
 * @since 2024-09-01
 */

'use strict';

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = '#ccc';

// Couleurs pour chaque type de Pokémon
const typeColors = {
    'Électrique': '#FFD700',
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Eau': '#6890F0',
    'Normal': '#A8A878',
    'Fée': '#EE99AC',
    'Spectre': '#705898',
    'Combat': '#C03028',
    'Vol': '#A890F0',
    'Glace': '#98D8D8',
    'Roche': '#B8A038',
    'Sol': '#E0C068',
    'Psy': '#F85888'
};

// Tableau d'objets représentant les Pokémon
const pokemons = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal,Combat', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
];

// Stockage des références aux éléments HTML
const container = document.querySelector('.pokemon-container');
const searchBar = document.getElementById('search-bar');
const typeFilter = document.getElementById('type-filter');

/**
 * Génère le HTML pour un Pokémon
 * @param {Object} pokemon - Un objet Pokémon avec les propriétés name, type, level, img
 * @returns {string} - Le HTML de la carte Pokémon
 */
function generatePokemonCardHTML({ name, type, level, img }) {
    const types = type.split(',');
    let bgColor;

    if (types.length === 2) {
        const color1 = typeColors[types[0].trim()] || DEFAULT_COLOR;
        const color2 = typeColors[types[1].trim()] || DEFAULT_COLOR;
        bgColor = `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`;
    } else {
        bgColor = typeColors[types[0].trim()] || DEFAULT_COLOR;
    }

    const imgPath = `images/${img}`;

    return `
        <div class="pokemon-card" style="background: ${bgColor};">
            <img src="${imgPath}" alt="${name}">
            <h2>${name}</h2>
            <div>Type: ${types.join(' / ')}</div>
            <div>Niveau: ${level}</div>
        </div>
    `;
}

/**
 * Affiche les Pokémon dans le conteneur spécifié.
 * @param {Array<Object>} pokemons - Tableau d'objets représentant les Pokémon.
 */
function displayPokemons(pokemons) {
    if (pokemons.length === 0) {
        // Si aucun Pokémon ne correspond, afficher un message amusant
        container.innerHTML = `<p>Dracaufeu a tout brûlé, aucun Pokémon ne correspond à ta recherche !</p>`;
        return;
    }

    let result = ''; // Variable pour stocker le HTML généré

    for (const pokemon of pokemons) {
        // Vérifie que les données du Pokémon sont complètes
        if (!pokemon.name || !pokemon.type || !pokemon.level || !pokemon.img) {
            // Affiche un message d'erreur dans la console
            console.error('Pokémon data is incomplete:', pokemon);
            // Ignore ce Pokémon et passe au suivant
            continue;
        }

        // Génère le HTML pour la carte Pokémon
        // et l'ajoute à la variable de résultat
        result += generatePokemonCardHTML(pokemon);
    }
    // Affiche les cartes Pokémon dans le conteneur
    // On passe par une variable intermédiaire pour éviter de modifier le DOM à chaque itération
    // Cela améliore les performances en réduisant le nombre de reflows
    container.innerHTML = result;
}

/**
 * Filtre et trie les Pokémon selon les critères de recherche, de type et d'ordre de tri
 */
function filterAndSortPokemons() {
    const searchQuery = searchBar.value.toLowerCase();
    const selectedType = typeFilter.value;

    let filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery));
    filteredPokemons = filteredPokemons.filter(pokemon => selectedType === "" || pokemon.type.includes(selectedType));

    displayPokemons(filteredPokemons);
}

// Ajout des gestionnaires d'événements
searchBar.addEventListener('input', filterAndSortPokemons);
typeFilter.addEventListener('change', filterAndSortPokemons);

// Appliquer le tri et le filtrage par défaut
filterAndSortPokemons();
