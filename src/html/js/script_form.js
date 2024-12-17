let val_code_postal = document.getElementById("code_postal");
let message_code_postal = document.getElementById("message_cp");

let val_num_telephone = document.getElementById("telephone");
let message_num_telephone = document.getElementById("verif_telephone");

let val_tva = document.getElementById("tva");
let message_tva = document.getElementById("verif_tva");

let val_nom = document.getElementById("nom");

let fleche_haut = document.getElementById("arrowTop");

//script menu burger
const burgerMenu = document.getElementById('burger-menu');
const menu = document.querySelector('#menu');

burgerMenu.addEventListener('click', () => {
    menu.classList.toggle('open');
    burgerMenu.classList.toggle('active');
});




//vérification CP
ex_reg_cp = /^\d{5}$/;
let select_ville = document.getElementById("select_ville");
val_code_postal.addEventListener("input", async function () {
    if (val_code_postal.value === "") {
        message_code_postal.style.display = "none";
        val_code_postal.setCustomValidity("");

        let premierEnfant = select_ville.firstElementChild;

        while (select_ville.childNodes.length > 1) {
            select_ville.removeChild(select_ville.lastChild);
        }

        select_ville.insertBefore(premierEnfant, select_ville.firstChild);
    }


    else if (ex_reg_cp.test(val_code_postal.value)) {
        message_code_postal.style.display = "block";
        message_code_postal.textContent = "✓";
        message_code_postal.style.color = "green";
        val_code_postal.setCustomValidity("");

        let data_cp = val_code_postal.value;
        let fetchResult = await fetch('https://apicarto.ign.fr/api/codes-postaux/communes/' + data_cp);

        let data = await fetchResult.json();
        let nbr_commune = data.length;

        //console.log(data);

        for (let i = 0; i < nbr_commune; i++) {
            let opt = document.createElement("option");
            opt.value = data[i]["nomCommune"];
            opt.innerHTML = data[i]["nomCommune"];
            select_ville.add(opt);
        }


    }

    else {
        message_code_postal.style.display = "none";
        val_code_postal.setCustomValidity("Le numéro doit contenir 5 chiffres");

        let premierEnfant = select_ville.firstElementChild;

        while (select_ville.childNodes.length > 1) {
            select_ville.removeChild(select_ville.lastChild);
        }

        select_ville.insertBefore(premierEnfant, select_ville.firstChild);
    }
    val_code_postal.reportValidity();
})





const textareaAdresse = document.querySelector('.adresse_txta');
const inputCodePostal = document.getElementById('code_postal');
const selectVille = document.getElementById('select_ville');
const buttonSearch = document.getElementById('search_button'); // Bouton de recherche

const map = L.map('map').setView([48.8566, 2.3522], 13); // Vue initiale sur Paris

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);



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

//vérification num téléphone
ex_reg_tel = /^\d{10}$/;
val_num_telephone.addEventListener("input", function () {
    if (val_num_telephone.value === "") {
        message_num_telephone.style.display = "none";
        val_num_telephone.setCustomValidity("");
    }

    else if (ex_reg_tel.test(val_num_telephone.value)) {
        val_num_telephone.setCustomValidity("");
        message_num_telephone.style.display = "block";
        message_num_telephone.textContent = "✓";
        message_num_telephone.style.color = "green";
    }
    else {
        message_num_telephone.style.display = "none";
        val_num_telephone.setCustomValidity("Le numéro doit contenir 10 chiffres");
    }
    val_num_telephone.reportValidity();
})


//vérifier l'adresse avant l'envoi du formulaire
const form = document.getElementById('form_commande');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!adresseValide) {
        alert("Veuillez vérifier que l'adresse est correcte avant d'envoyer le formulaire.");
        return;
    }

    form.submit();
});



//mettre le nom en majuscule
val_nom.addEventListener("input", function () {
    val_nom.style.textTransform = "uppercase";
})



//fleche permettant de remonter en haut de la page
window.addEventListener('scroll', function () {
    if (this.window.scrollY >= 150) {
        fleche_haut.hidden = false;
    }
    else {
        fleche_haut.hidden = true;
    }
});

fleche_haut.addEventListener("click", function () {
    window.scroll(0, 0);
})

