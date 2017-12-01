//var App = App || {};
//console.log('App in auth.js :', App)


var AuthModule = (function () {


    var inscription = function () {
        $('#inscription').on('click', function (e) {

            e.preventDefault();

            var xhr = new XMLHttpRequest();
            var url = "http://loisirs-web-backend.cleverapps.io/users";

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                }
            };
            var data = JSON.stringify({
                "name": document.getElementById("name").value,
                "password": document.getElementById("password").value
            });
            xhr.send(data);

        });
    }

    var connexion = function () {
        $('#connexion').on('click', function (e) {

            e.preventDefault();

            var xhr = new XMLHttpRequest();
            var url = "http://loisirs-web-backend.cleverapps.io/users";

            xhr.onreadystatechange = function () {

                var trouve = false;

                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);

                    var i;
                    for (i = 0; i < json.length; i++) {
                        if (document.getElementById("name2").value == json[i].name && document.getElementById("password2").value == json[i].password) {
                            trouve = true;
                        }
                    }
                }

                if (trouve) {
                    setCookie("userConnected", trouve);
                    window.location.replace("http://127.0.0.1:8080/poker/template/histoire.html");
                }
            };

            xhr.open("GET", url, true);
            xhr.send();

        });
    }

    var deconnexion = function () {
        $('#deconnexion').on('click', function (e) {
            setCookie("userConnected", "");
        });
    }

    return {
        signup: inscription,
        signin: connexion,
        signout: deconnexion
    };

})()