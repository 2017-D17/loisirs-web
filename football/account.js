var Account = (function () {
    var self = {};
    self.connexion = function () {
        console.log("connexion en cours")
        // Get some values from elements on the page:
        var nom = document.getElementById("inputName1").value;
        var motpass = document.getElementById("inputPassword1").value;
        console.log("name = " + nom + " et passs = " + motpass)
        // Verifier la base donnée utilisateur
        var url = "https://loisirs-web-backend.cleverapps.io/users/?name=" + nom;
        //récupérer et comparer les données
        $.get(url).then(response => {
            if (response.length == 0) {
                alert("Nom inconnu")
            }
            else {
                if (response[0].password == motpass) {
                    setCookie("username", nom, 1);
                    location.href = "home.html";

                }
                else {
                    alert("Mot de passe incorrect")
                }

            }

        })
    }
    self.deconnexion = function () {
        setCookie("username", "", -1);
        location = "index.html";
    }

    return self;

})();

