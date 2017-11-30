var URL = "http://loisirs-web-backend.cleverapps.io/users";
var name;
var password;

function valid() {

    name = document.getElementById("name").value;
    password = document.getElementById("password").value;

    if (name == "" || password == "") {

        document.getElementById("alert").innerHTML = "Le login ou password est vide";

    } else {

        var newUser = { "name": name, "password": password };

        $.post(URL, newUser).then(function () { document.location.href = "./home.html" });
    }
}

function checkInfos() {

    name = document.getElementById("name").value;
    password = document.getElementById("password").value;

    if(getCookie("name") != "") {

        document.location = "./Series/home.html";
        alert(document.location);
    } else {
        alert("passe");
        createCookie("name", name, 1);

        if(name == "" || password == "") {

            document.getElementById("alert").innerHTML = "Renseignez les champs !";

        } else {

            $.getJSON(URL + "/?name=" + login + "&password=" + password, function (result) {
                
                if(result[0].name == "" || result[0].password == "") {

                    document.getElementById("alert").innerHTML = "Saisissez tous les champs !";

                } else if(result[0].name == name && result[0].password == password) {

                    createCookie("name", name, 1);

                    document.location = "./Series/home.html";

                } else {

                    document.getElementById("alert").innerHTML = "Not found! Login ou password incorrecte";

                }
            });
        }
    }


}

function logOut() {

    alert(document.cookie);
    eraseCookie("name");
    alert(document.cookie);

    document.location.href = "index.html";
}

function createCookie(key, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
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