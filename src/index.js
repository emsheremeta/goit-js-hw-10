import './css/styles.css';
import fcLib from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo =  document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY))

function onCountryInput() {
const name = countryInput.value.trim()
if( name === "") {
    return (countryInfo.innerHTML = ''),(countryList.innerHTML = '')
}
console.log(name)
fcLib.fetchCountries(name)
.then(countries => {
    console.log(countries);
    countryInfo.innerHTML =''
    countryList.innerHTML =''
    if(countries.length ===1){
        countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
        countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
    } else if (countries.length >=10){
        alert()  
    } else {
        countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
    }
}).catch (notificationError)
}


 function renderCountryList (countries) {
     const markup = countries.map(({name, flags}) => {
         return `
         <li class = "country-list__item">
         <img class = "country-list__flag" src="${flags.svg}" alt = "Flag of ${name.official}" width = 30px height = 30px>
         <h1 class = "country-list__name"> ${name.official} </h1>
         </li> 
         `
     }).join ('')
     return markup
 };
 

 function renderCountryInfo (countries) {
     const markup = countries.map (({capital, population, languages}) => {
         let language = Object.values(languages);
         return `
         <li class = "country-info__item">
         <p><b> Capital:</b> ${capital} </p>
         </li>
         <li class = "country-info__item">
         <p><b> Population:</b> ${population} </p>
         </li>
         <li class = "country-info__item">
         <p><b> Language:</b> ${language} </p>
         </li>
         `   
     }).join('')
     return markup
 };
 

 function notificationError () {
    Notiflix.Notify.failure("Oops, there is no country with that name")
 };

 function alert () {
    Notiflix.Notify.warning("Too many matches found. Please enter a more specific name")
 };

// fetch("https://restcountries.com/v2/name/peru")
//   .then(response => {
//     // Response handling
//     return response.json();
//   })
//   .then(peru => {
//       console.log(peru)
//     // Data handling
//   })
//   .catch(error => {
//     console.error(error)
//     // Error handling
//   });