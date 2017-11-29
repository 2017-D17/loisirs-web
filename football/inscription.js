

function inscription() {
    console.log("inscription en cours")
    // Get some values from elements on the page:
    var $form = $(this);
    var nom = document.getElementById("inputName").value;
    var motpass = document.getElementById("inputPassword").value;
    console.log("name = " + nom + " et passs = " + motpass)
    // Send the data using post
    var url = "https://loisirs-web-backend.cleverapps.io/users";
    var url1 = "https://loisirs-web-backend.cleverapps.io/users/?name=" + nom;

    //Vérifier si utilisateur est déjà inscrit
    $.get(url1).then(response => {
        if (nom == "" && motpass == "") {
            alert("Veuillez remplir le champ");
        }
        else if (response.length > 0) {
            alert("Vous êtes déjà inscrit")
        }
        else {
            $.post(url, { "name": nom, "password": motpass }).then(resp => {
                console.log(resp)
            })
            location.href = "home.html";
            alert("Vous êtes inscrit");
        }

    })

}



