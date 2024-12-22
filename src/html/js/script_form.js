let valCodePostal = document.getElementById("code_postal");
let messageCodePostal = document.getElementById("message_cp");

let valNumTelephone = document.getElementById("telephone");
let messageNumTelephone = document.getElementById("verif_telephone");

let valTva = document.getElementById("tva");
let messageTva = document.getElementById("verif_tva");

let valNom = document.getElementById("nom");

let flecheHaut = document.getElementById("arrowTop");

// vérification CP
let exRegCp = /^\d{5}$/;
let selectVille = document.getElementById("select_ville");
valCodePostal.addEventListener("input", async function () {
    if (valCodePostal.value === "") {
        messageCodePostal.style.display = "none";
        valCodePostal.setCustomValidity("");

        let premierEnfant = selectVille.firstElementChild;

        while (selectVille.childNodes.length > 1) {
            selectVille.removeChild(selectVille.lastChild);
        }

        selectVille.insertBefore(premierEnfant, selectVille.firstChild);
    } else if (exRegCp.test(valCodePostal.value)) {
        messageCodePostal.style.display = "block";
        messageCodePostal.textContent = "✓";
        messageCodePostal.style.color = "green";
        valCodePostal.setCustomValidity("");

        let dataCp = valCodePostal.value;
        let fetchResult = await fetch('https://apicarto.ign.fr/api/codes-postaux/communes/' + dataCp);

        let data = await fetchResult.json();
        let nbrCommune = data.length;

        for (let i = 0; i < nbrCommune; i++) {
            let opt = document.createElement("option");
            opt.value = data[i]["nomCommune"];
            opt.innerHTML = data[i]["nomCommune"];
            selectVille.add(opt);
        }
    } else {
        messageCodePostal.style.display = "none";
        valCodePostal.setCustomValidity("Le numéro doit contenir 5 chiffres");

        let premierEnfant = selectVille.firstElementChild;

        while (selectVille.childNodes.length > 1) {
            selectVille.removeChild(selectVille.lastChild);
        }

        selectVille.insertBefore(premierEnfant, selectVille.firstChild);
    }
    valCodePostal.reportValidity();
});

const textareaAdresse = document.querySelector('.adresse_txta');
const inputCodePostal = document.getElementById('code_postal');
const buttonSearch = document.getElementById('search_button'); // Bouton de recherche

const map = L.map('map').setView([46.603354, 1.888334], 5); // Vue initiale sur Paris

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

map.scrollWheelZoom.disable();

function verifierChamps() {
    const adresse = textareaAdresse.value.trim();

    if (!adresse) {
        buttonSearch.classList.add('disabled');
    } else {
        buttonSearch.classList.remove('disabled');
    }
}

textareaAdresse.addEventListener('input', verifierChamps);
inputCodePostal.addEventListener('input', verifierChamps);
selectVille.addEventListener('change', verifierChamps);

document.addEventListener('DOMContentLoaded', verifierChamps);

function verifPrix() {
    const prix = 12.99;
    const txtPrix = document.getElementById('prix');
    const quantite = document.getElementById('quantite').value;

    txtPrix.innerText = "Prix total : " + quantite * prix + "€";
}

document.getElementById('quantite').addEventListener('change', verifPrix);

let adresseValide = false;

async function afficherAdresseSurCarte() {
    const adresse = textareaAdresse.value.trim();
    const codePostal = inputCodePostal.value.trim();
    const ville = selectVille.value.trim();

    const adresseComplete = `${adresse}, ${codePostal}, ${ville}`;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresseComplete)}&format=json&addressdetails=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            alert('Adresse introuvable. Veuillez vérifier les informations saisies.');
            return;
        }

        adresseValide = true;

        const { lat, lon } = data[0];

        map.setView([lat, lon], 15);
        L.marker([lat, lon]).addTo(map).bindPopup(`Adresse trouvée : ${adresseComplete}`).openPopup();
    } catch (error) {
        console.error('Erreur lors de la recherche de l’adresse :', error);
        alert('Une erreur est survenue lors de la recherche de l’adresse.');
        adresseValide = false;
    }
}

buttonSearch.addEventListener('click', (event) => {
    event.preventDefault();
    afficherAdresseSurCarte();
});

// vérification num téléphone
let exRegTel = /^\d{10}$/;
valNumTelephone.addEventListener("input", function () {
    if (valNumTelephone.value === "") {
        messageNumTelephone.style.display = "none";
        valNumTelephone.setCustomValidity("");
    } else if (exRegTel.test(valNumTelephone.value)) {
        valNumTelephone.setCustomValidity("");
        messageNumTelephone.style.display = "block";
        messageNumTelephone.textContent = "✓";
        messageNumTelephone.style.color = "green";
    } else {
        messageNumTelephone.style.display = "none";
        valNumTelephone.setCustomValidity("Le numéro doit contenir 10 chiffres");
    }
    valNumTelephone.reportValidity();
});

// vérifier l'adresse avant l'envoi du formulaire
const form = document.getElementById('form_commande');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!adresseValide) {
        alert("Veuillez vérifier que l'adresse est correcte avant d'envoyer le formulaire.");
        return;
    }

    form.submit();
});

// mettre le nom en majuscule
valNom.addEventListener("input", function () {
    valNom.style.textTransform = "uppercase";
});

// flèche permettant de remonter en haut de la page
window.addEventListener('scroll', function () {
    if (this.window.scrollY >= 150) {
        flecheHaut.hidden = false;
    } else {
        flecheHaut.hidden = true;
    }
});

flecheHaut.addEventListener("click", function () {
    window.scroll(0, 0);
});
