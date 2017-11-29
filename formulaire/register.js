function register() {

    console.log("inscription en cours")

    // Get some values from elements on the page:

    var $form = $(this);

    var nom = document.getElementById("username").value;

    var motpasse = document.getElementById("password").value;

    console.log("name = " + nom + " et passs = " + motpass)

    // Send the data using post

    var url = "http://loisirs-web-backend.cleverapps.io/users";

    $.post(url, { "name": nom, "password": motpass }).then(resp => {

        console.log(resp)

    })



    jQuery(function ($) {

        var nom = $("#username");
        valid = false;
        /* je verifie que le champs n'est pas vide et j'applique une classe et j'affiche la div error*/
        $("#username").blur(function () {
            if ($("#username").val() == "") {
                nom.next(".error").show().text("Le champ Nom  est obligatoire ");
                nom.addClass("border2");
                valid = false;
            }
            else { valid = true }
        });
        $("#password").blur(function () {
            if ($("#password").val() == "") {
                nom.next(".error").show().text("Le champ Nom  est obligatoire ");
                nom.addClass("border2");
                valid = false;
            }
            else { valid = true }
        });

        $("#button").click(function () {
            if (valid == true)

                alert("ok!")

            else
                alert("les champs username et password sont obligatoires")
            return false
        });






        function connexion() {


            // Get some values from elements on the page:

            var $form = $(this);

            var nom = document.getElementById("username").value;

            var motpass = document.getElementById("password").value;

            console.log("name = " + nom + " et passs = " + motpass)

            // Verifier la base donnée utilisateur

            var url = "http://loisirs-web-backend.cleverapps.io/users/?name=" + nom;

            var i;

            //récupérer et comparer les données

            $.get(url).then(response => {

                if (response.length == 0) {

                    alert("Nom inconnu")

                }

                else {

                    if (response[0].password == motpass) {

                        location.href = "index.html";

                    }

                    else {

                        alert("Mot de passe incorrect")

                    }
                }

            })
        }

    }




          jQuery(function ($) {

            var nom = $("#username");
            valid = false;
            /* je verifie que le champs n'est pas vide et j'applique une classe et j'affiche la div error*/
            $("#username").blur(function () {
                if ($("#username").val() == "") {
                    nom.next(".error").show().text("Le champ username  est obligatoire ");
                    nom.addClass("border2");
                    valid = false;
                }
                else { valid = true }
            });
            $("#password").blur(function () {
                if ($("#password").val() == "") {
                    nom.next(".error").show().text("Le champ password  est obligatoire ");
                    nom.addClass("border2");
                    valid = false;
                }
                else { valid = true }
            });

            $("#button").click(function () {
                if (valid == true)

                    location.href = "./voyage/index.html";

                else

                    alert("les champs username et password sont obligatoires")
                return false
            });

        });
}