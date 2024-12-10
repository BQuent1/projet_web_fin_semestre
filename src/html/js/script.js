
document.getElementById('monFormulaire').addEventListener('submit', function(event) {
    var nom = document.getElementById('nom').value.trim();
    var prenom = document.getElementById('prenom').value.trim();
    var societe = document.getElementById('societe').value.trim();
    var email = document.getElementById('email').value.trim()
    // Ajoutez d'autres champs à vérifier ici
    
    if (nom === '' || prenom === '' || societe == '' || email == '') {
        alert('Veuillez remplir tous les champs obligatoires.');
        event.preventDefault(); // Empêche le formulaire de se soumettre
    }
});

