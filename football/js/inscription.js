
//import * as cookies from '/cookies.js';

function inscription() {
    console.log("inscription en cours")
    // Get username and password
    var nom = document.getElementById("inputName").value;
    var motpass = document.getElementById("inputPassword").value;
    console.log("name = " + nom + " et passs = " + motpass)
    //url 
    var url = "https://loisirs-web-backend.cleverapps.io/users";
    var url1 = "https://loisirs-web-backend.cleverapps.io/users/?name=" + nom;
    //Vérifier si utilisateur est déjà inscrit
    $.get(url1).then(response => {
        if (response.length > 0) {
            alert("Vous êtes déjà inscrit")
        }
        //mettre les données 
        else {
            $.post(url, { "name": nom, "password": motpass }).then(resp => {
                console.log(resp)
                setCookie("username", nom, 1)
                location.href = "home.html"
                alert("Vous êtes inscrit")
            })

        }

    })

}



