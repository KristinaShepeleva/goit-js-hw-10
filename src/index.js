import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list");
const div = document.querySelector(".country-info");

input.addEventListener('input', onInputSearch)

function onInputSearch() {
    
}


function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages`)
        .then(responce => responce.json());
    
};
console.log(responce => responce.json());
//https://restcountries.com/v3.1/name/{name}

//https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов