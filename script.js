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

        // Trier les pays par ordre alphabétique
        countries.sort(
            (a,b) => a.name.common.localeCompare(b.name.common)  
        )

        // Remplir le select
        countrySelect.innerHTML = `<option value="">-- Sélectionner un pays --</option>`
        countries.forEach(c => {
            const opt = document.createElement("option")
            opt.value = c.cca3 //code iso du pays
            opt.textContent = c.name.common //nom du pays
            
            countrySelect.appendChild(opt)
        })
        
        // Vérification dans la console
        console.log("Données reçues :", countries); 
    }
    catch (e) {
        console.error("Erreur lors du chargement: ", e)
    }
}


// Appeler la fonction loadCountries()
loadCountries();