// Récupération des éléments du DOM
const countrySelect = document.getElementById("country");
const infoDiv = document.getElementById("info")
const flagImg = document.getElementById("flag")
const capitalSpan = document.getElementById("capital")
const populationSpan = document.getElementById("Population")
const currencySpan = document.getElementById("currency")
const searchInput = document.getElementById("searchInput"); // Récupération de l'élément searchInput

//Notre "Mémoire" locale
let allCountries = []; // On déclare un tableau vide qui va stocker TOUS les pays

// On écoute la saisie de l'utilisateur dans la barre de recherche
searchInput.addEventListener("input", (e) => {
    // 1. On récupère ce qui est tapé et on le met en minuscules
    const term = e.target.value.toLowerCase();

    // 2. L'Algorithme de filtrage
    const filtered = allCountries.filter(country => {
        const name = country.name.common.toLowerCase();
        return name.includes(term);
    });

    // 3. On met à jour l'affichage avec les pays filtrés
    displayCountries(filtered);
});



// Afficher les infos du pays selectionné
countrySelect.addEventListener("change", () => {
    // 1. Récupérer l'élément HTML <option> qui est actuellement sélectionné
    const selected = countrySelect.selectedOptions[0];

    // 2. Gérer le cas où l'utilisateur sélectionne l'option par défaut vide
    if (!selected.value) {
        infoDiv.classList.add("hidden");
        return;
    }

    // Mettre à jour l'image du drapeau
    flagImg.src = selected.dataset.flag;
    flagImg.alt = `Le drapeau de ${selected.textContent}`;

    // Mettre à jour les spans de détails
    capitalSpan.textContent = selected.dataset.capital;

    // Formater la population pour qu'elle soit lisible (toLocaleString)
    populationSpan.textContent = Number(selected.dataset.population).toLocaleString();

    // Mettre à jour la monnaie
    currencySpan.textContent = selected.dataset.currency;

    // Afficher la section d'informations en retirant la classe 'hidden'
    infoDiv.classList.remove("hidden");
});

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

        // On remplit d'abord allCountries
        allCountries = countries;

        // Maintenant on affiche ce qu'on vient de mémoriser
        displayCountries(allCountries);
        
        // Vérification dans la console
        console.log("Données reçues :", countries); 
    }
    catch (e) {
        console.error("Erreur lors du chargement: ", e)
    }
}

// Cette fonction peut maintenant afficher soit tous les pays, soit seulement 3 !
function displayCountries(list) {
    // 1. ON VIDE le menu actuel pour repartir de zéro
    countrySelect.innerHTML = `<option value="">-- Sélectionner un pays --</option>`;

    // 2. On parcourt la liste (complète ou filtrée)
    list.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.cca3;
        opt.textContent = c.name.common;

        // On garde nos datasets pour que les détails fonctionnent toujours
        opt.dataset.flag = c.flags.png;
        opt.dataset.capital = c.capital ? c.capital[0] : "N/A";
        opt.dataset.population = c.population;
        opt.dataset.currency = c.currencies ? Object.keys(c.currencies).join(", ") : "N/A";

        countrySelect.appendChild(opt);
    });
}


// Appeler la fonction loadCountries()
loadCountries();