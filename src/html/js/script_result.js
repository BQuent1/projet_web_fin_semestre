const queryParams = new URLSearchParams(window.location.search);

document.getElementById("recap_genre").textContent = queryParams.get("genre") || "Non renseigné";
document.getElementById("recap_nom").textContent = queryParams.get("nom") || "Non renseigné";
document.getElementById("recap_prenom").textContent = queryParams.get("prenom") || "Non renseigné";
document.getElementById("recap_email").textContent = queryParams.get("email") || "Non renseigné";
document.getElementById("recap_telephone").textContent = queryParams.get("tel") || "Non renseigné";
document.getElementById("recap_adresse").textContent = queryParams.get("adresse") || "Non renseignée";
document.getElementById("recap_cp").textContent = queryParams.get("CP") || "Non renseigné";
document.getElementById("recap_ville").textContent = queryParams.get("ville") || "Non renseignée";
document.getElementById("recap_quantite").textContent = queryParams.get("quantite") || "Non spécifiée";


//script menu burger
const burgerMenu = document.getElementById('burger-menu');
const menu = document.querySelector('#menu');

burgerMenu.addEventListener('click', () => {
    menu.classList.toggle('open');
    burgerMenu.classList.toggle('active');
});