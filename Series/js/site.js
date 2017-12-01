var URL = "https://loisirs-web-backend.cleverapps.io/users";

function valid() {

    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if (name == "" || password == "") {

        document.getElementById("alert").innerHTML = "Le login ou password est vide";

    } else {

        var newUser = { "name": name, "password": password };

        $.post(URL, newUser).then(function () { document.location.href = "home.html"; });
    }
}

function checkInfos() {

   var name = document.getElementById("name").value;
   var password = document.getElementById("password").value;
   var cookie = getCookie("name");

    if (cookie == "") {

        if (name == "" || password == "") {

            document.getElementById("alert").innerHTML = "Renseignez les champs !";

        } else {

            $.getJSON(URL + "/?name=" + name + "&password=" + password).then(result => {
               
                if (result[0].name == "" || result[0].password == "") {

                    document.getElementById("alert").innerHTML = "Saisissez tous les champs !";

                } else if(result[0].name != name || result[0].password != password){

                    document.getElementById("alert").innerHTML = "Not found! Login ou password incorrecte";

                }else{

                    createCookie("name", name, 1); 
                    document.location.href = "home.html";
                }
            });
        }
    }else{
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
    }else{ 
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