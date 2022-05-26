 const BASE_URL = 'https://restcountries.com/v3.1';
  function fetchCountries(name) {

    let url = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`;
    console.log(url);
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
          console.log(response);    
        return response.json();
     });
    
 }; 
 export default {fetchCountries};

