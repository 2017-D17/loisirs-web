var URL = "https://loisirs-web-backend.cleverapps.io/users";

function urlCheck(event){

    event.preventDefault();

    if(document.location.pathname == "/Series/home.html"){
        if(getCookie("name") == ""){
            document.location.href = "index.html";
        }else{
            document.location.href = "home.html";
        }
    }
}

function valid(event) {

    event.preventDefault();

    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if (name == "" || password == "") {

        document.getElementById("alert").innerHTML = "<div class=\"alert alert-danger\"><strong>Erreur!</strong> Renseignez tous les champs</div>";

    } else {

        $.getJSON(URL + "/?name=" + name + "&password=" + password).then(result => {

            if (result == "") {

                var newUser = { "name": name, "password": password };
                $.post(URL, newUser).then(function () { 

                    createCookie("name", name, 1);
                    document.location.href = "home.html"; 
                });

            } else {

                document.getElementById("alert").innerHTML = "<div class=\"alert alert-danger\"><strong>Déjà inscrit!</strong> Connectez-vous!</div>";
            }
        });
    }
}

function connexion(event) {

    event.preventDefault();

    if (getCookie("name") == "") {
        document.location.href = "connexion.html";
    } else {
        document.location.href = "home.html";
    };

}

function checkInfos(event) {

    event.preventDefault();

    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if (getCookie("name") == "") {

        if (name == "" || password == "") {

            document.getElementById("alert").innerHTML = "<div class=\"alert alert-danger\"><strong>Erreur!</strong> Renseignez tous les champs</div>";

        } else {

            $.getJSON(URL + "/?name=" + name + "&password=" + password).then(result => {

                if (result == "") {

                    document.getElementById("alert").innerHTML = "<div class=\"alert alert-danger\"><strong>Not found!</strong> Login ou password incorrecte</div>";

                } else {

                    createCookie("name", name, 1);
                    document.location.href = "home.html";
                }
            });
        }
    } else {
        document.location.href = "home.html";
    }
}

function logOut() {

    eraseCookie("name");
    document.location.href = "index.html";
}

function createCookie(key, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = key + "=" + value + expires + "; path=/";
}

function eraseCookie(key) {
    createCookie(key, "", -1);
}

function getCookie(theKey) {
    var key = theKey + "=";
    var datas = document.cookie.split(';');
    for (var i = 0; i < datas.length; i++) {
        var d = datas[i];
        while (d.charAt(0) == ' ') {
            d = d.substring(1);
        }
        if (d.indexOf(key) == 0) {
            return d.substring(key.length, d.length);
        }
    }
    return "";
}

function createComment(event) {

    event.preventDefault();

    var commentStorage = window.localStorage;

    var comment = commentStorage.getItem("comment");
}