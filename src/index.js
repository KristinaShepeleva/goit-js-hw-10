import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list");
const div = document.querySelector(".country-info");

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))

function onInputSearch(e) {
    let searchCountryName = e.target.value.trim();
    if (searchCountryName) {
        return fetchCountries(searchCountryName).then(countries => {
            if (countries.length === 1) {
                createCountrieCard(countries);
                Notiflix.Notify.success('Here your result');
            }
            else if (countries.length <= 10 && countries.length > 1) {
                createCountrieList(countries);
                Notiflix.Notify.success('Here your results');
            }
            else {
                clearMarkup();
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            };
        }).catch(() => {
                clearMarkup();
                Notiflix.Notify.failure('Oops, there is no country with that name.');
            })
    }
};

function createCountrieCard(countries) {
   clearMarkup();
    const country = countries[0];
    const markupCard = `<div class="country-card">
        <div class="country-card--header">
            <img src="${country.flags.svg}" alt="Country flag" width="55", height="35">
            <h2 class="country-card--name"> ${country.name.official}</h2>
        </div>
        <ul>
            <li class="country-card--field">Capital: <span class="country-value">${country.capital}</span></li>
            <li class="country-card--field">Population: <span class="country-value">${country.population}</span></li>
            <li class="country-card--field">Languages: <span class="country-value">${Object.values(country.languages).join(',')}</span></li>
             </ul>
    </div>`
    div.innerHTML = markupCard;
};

function createCountrieList(countries) {
    clearMarkup();
    const markupList = countries
     .map(country => {
       return `<li class="country-list--item">
             <img src="${country.flags.svg}" alt="${country.name.official}" width="40" height="20" /> 
             <p>${country.name.official}</p>
             </li>`;
     }).join("");
    list.innerHTML = markupList;
};

function clearMarkup() {
  list.innerHTML = '';
  div.innerHTML = '';
};


