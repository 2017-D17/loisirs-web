function connexion() {
    console.log("connexion en cours")
    // Get some values from elements on the page:
    var $form = $(this);
    var nom = document.getElementById("inputName1").value;
    var motpass = document.getElementById("inputPassword1").value;
    console.log("name = " + nom + " et passs = " + motpass)
    // Verifier la base donnée utilisateur
    var url = "https://loisirs-web-backend.cleverapps.io/users/?name=" + nom;

    var i;
    //récupérer et comparer les données
    $.get(url).then(response => {
        if (nom == "" && motpass == "") {
            alert("Veuillez remplir le champ");
        } else if (response.length == 0) {
            alert("Nom inconnu")
        }
        else if (response[0].password == motpass) {
            location.href = "home.html";
        }
        else {
            alert("Mot de passe incorrect")
        }
    })
} l


