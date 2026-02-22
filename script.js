console.log("Script Chargé")

// Importer les éléments HTML nécessaires
const countrySelect = document.getElementById("country")
const infoDiv = document.getElementById("info")
const flagImg = document.getElementById("flag")
const capitalSpan = document.getElementById("capital")
const populationSpan = document.getElementById("population")
const currencySpan = document.getElementById("currency")

//Charger les pays dans le select
loadCountries()

// Afficher les infos du pays selectionné
countrySelect.addEventListener("change", () => {
    const selected = countrySelect.selectedOptions[0]

    if (!selected.value) {
        infoDiv.classList.add("hidden");
        return;
    }

    flagImg.src = selected.dataset.flag
    flagImg.alt = `Le drapeau de ${selected.textContent}`
    capitalSpan.textContent = selected.dataset.capital
    populationSpan.textContent = Number(selected.dataset.population).toLocaleString()
    currencySpan.textContent = selected.dataset.currency


    infoDiv.classList.remove("hidden")
})

//Fonction loadCountries() pour charger les pays
async function loadCountries() {
    try{
        // Récupérer les pays depuis l'api
        const res = await fetch("https://restcountries.com/v3.1/region/africa")
        const countries = await res.json()

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
            opt.dataset.flag = c.flags.png //Le drapeau
            opt.dataset.capital = c.capital[0] //la capitale
            opt.dataset.population = c.population //Population
            opt.dataset.currency = Object.keys(c.currencies).join(", ") //Monnaie

            countrySelect.appendChild(opt)
        })

    }
    catch (e) {
        console.error("Erreur lors du chargement: ", e)
    }
}
