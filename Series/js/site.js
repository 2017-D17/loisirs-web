var URL = 'http://loisirs-web-backend.cleverapps.io/users';

function valid() {

    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if (name == "" || password == "") {

        document.getElementById("alert").innerHTML = "Le login ou password est vide";

    } else {

        var newUser = { "name": name, "password": password };

        $.post(URL, newUser).then(function () { document.location.href = "home.html" });
    }
}

function checkInfos() {

    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if (name == "" || password == "") {

        document.getElementById("alert").innerHTML = "Renseignez les champs !";

    } else {

        $.getJSON(URL, "name=" + login + "&password=" + password, function(result){

            if( result[0].name == "" || result[0].password == ""){

                document.getElementById("alert").innerHTML = "Saisissez tous les champs !";

            }else if (result[0].name == name && result[0].password == password){

                document.location.href = "home.html"

            }else{

                document.getElementById("alert").innerHTML = "Not found! Login ou password incorrecte";

            }
        });
    }
}