var AuthModule = (function () {


    var url = "http://loisirs-web-backend.cleverapps.io/users";

    var inscription = function (name, password, callback) {

        $.get(url + "/?name=" + name).then(resp => {

            if (resp.length > 0) {
                alert("User existe deja...");
                callback(false);
            }

            $.post(url, { "name": name, "password": password }).then(resp => {
                login(name);
                callback(true);
            })
        });

    }

    var connexion = function (name, password, callback) {
        $.get(url + "/?name=" + name).then(users => {
            if (users.length > 0 && users[0].password == password) {
                login(name);
                callback(true)
            } else {
                alert("mot de passe incorrect")
                callback(false)
            }
        })

    }

    function login(username) {
        setCookie("userConnected", true);
        setCookie("userName", username);
    }

    function logout() {
        setCookie("userConnected", "");
        setCookie("userName", "");
    }

    var deconnexion = function () {
        logout();
        window.location.replace("poker/");
    }

    var getUserName = function () {
        return getCookie("userName")
    }

    function setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";path=/poker/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var connected = getCookie("userConnected");
        if (!connected) {
            window.location.replace("http://127.0.0.1:8080/poker");
        }
    }

    var init = function () {

    }

    init();

    return {
        inscription,
        connexion,
        deconnexion,
        getUserName
    };

})()