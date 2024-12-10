var select_fournisseur = document.getElementById("select_fournisseur");
var autre_fournisseur = document.getElementById("nouv_fournisseur");

var val_code_postal = document.getElementById("code_postal");
var message_code_postal = document.getElementById("message_cp");

var val_num_telephone = document.getElementById("telephone");
var message_num_telephone = document.getElementById("verif_telephone");

var val_tva = document.getElementById("tva");
var message_tva = document.getElementById("verif_tva");

var val_nom = document.getElementById("nom");

var fleche_haut = document.getElementById("arrowTop");


//Ajouter un input si on séléctionne un autre fournisseur
select_fournisseur.addEventListener("change", function () {
    if (select_fournisseur.value == "Autre") {
        autre_fournisseur.style.display = "block";
    }
    else {
        autre_fournisseur.style.display = "none";

    }
})


//vérification CP
ex_reg_cp = /^\d{5}$/;
var select_ville = document.getElementById("select_ville");
val_code_postal.addEventListener("input", async function () {
    if (val_code_postal.value === "") {
        message_code_postal.style.display = "none";
        val_code_postal.setCustomValidity("");

        var premierEnfant = select_ville.firstElementChild;

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

        var data_cp = val_code_postal.value;
        var fetchResult = await fetch('https://apicarto.ign.fr/api/codes-postaux/communes/' + data_cp);

        var data = await fetchResult.json();
        var nbr_commune = data.length;

        console.log(data);

        for (let i = 0; i < nbr_commune; i++) {
            var opt = document.createElement("option");
            opt.value = data[i]["nomCommune"];
            opt.innerHTML = data[i]["nomCommune"];
            select_ville.add(opt);
        }


    }

    else {
        message_code_postal.style.display = "none";
        val_code_postal.setCustomValidity("Le numéro doit contenir 5 chiffres");

        var premierEnfant = select_ville.firstElementChild;

        while (select_ville.childNodes.length > 1) {
            select_ville.removeChild(select_ville.lastChild);
        }

        select_ville.insertBefore(premierEnfant, select_ville.firstChild);
    }
    val_code_postal.reportValidity();
})







// Récupération des éléments HTML
const textareaAdresse = document.querySelector('.adresse_txta');
const inputCodePostal = document.getElementById('code_postal');
const selectVille = document.getElementById('select_ville');
const buttonSearch = document.getElementById('search_button'); // Bouton de recherche

// Initialisation de la carte Leaflet
const map = L.map('map').setView([48.8566, 2.3522], 13); // Vue initiale sur Paris

// Ajout des tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Fonction pour afficher l'adresse sur la carte
async function afficherAdresseSurCarte() {
    const adresse = textareaAdresse.value.trim();
    const codePostal = inputCodePostal.value.trim();
    const ville = selectVille.value.trim();

    if (!adresse || !codePostal || !ville) {
        alert('Veuillez remplir tous les champs (adresse, code postal et ville).');
        return;
    }

    // Construction de l'adresse complète
    const adresseComplete = `${adresse}, ${codePostal}, ${ville}`;

    // Utilisation de l'API Nominatim d'OpenStreetMap pour la géocodage
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresseComplete)}&format=json&addressdetails=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            alert('Adresse introuvable. Veuillez vérifier les informations saisies.');
            return;
        }

        // Récupération des coordonnées
        const { lat, lon } = data[0];

        // Centrage de la carte et ajout d'un marqueur
        map.setView([lat, lon], 15);
        L.marker([lat, lon]).addTo(map).bindPopup(`Adresse trouvée : ${adresseComplete}`).openPopup();
    } catch (error) {
        console.error('Erreur lors de la recherche de l’adresse :', error);
        alert('Une erreur est survenue lors de la recherche de l’adresse.');
    }
}

// Écouteur d'événement sur le bouton de recherche
buttonSearch.addEventListener('click', afficherAdresseSurCarte);














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


//verification num TVA
ex_reg_tva = /^FR\d{11}$/;
val_tva.addEventListener("input", function () {
    if (val_tva.value === "") {
        message_tva.style.display = "none";
        val_tva.setCustomValidity("");
    }

    else if (ex_reg_tva.test(val_tva.value)) {
        message_tva.style.display = "block";
        message_tva.textContent = "✓";
        message_tva.style.color = "green";
        val_tva.setCustomValidity("");

    }

    else {
        message_tva.style.display = "block";
        val_tva.setCustomValidity("Merci d'entrer un numéro de TVA valide (FR+11 chiffres)");
    }
    val_tva.reportValidity();

})


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

