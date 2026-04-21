// Récupération des éléments du DOM
const countrySelect = document.getElementById("country");
const infoDiv = document.getElementById("info")
const flagImg = document.getElementById("flag")
const capitalSpan = document.getElementById("capital")
const populationSpan = document.getElementById("population")
const currencySpan = document.getElementById("currency")

//Fonction loadCountries() pour charger les pays
async function loadCountries() {
    try{
        // Récupérer les pays depuis l'api
        const res = await fetch("https://restcountries.com/v3.1/region/africa");
        const countries = await res.json();
        
        // Vérification dans la console
        console.log("Données reçues :", countries); 
    }
    catch (e) {
        console.error("Erreur lors du chargement: ", e)
    }
}


// Appeler la fonction loadCountries()
loadCountries();