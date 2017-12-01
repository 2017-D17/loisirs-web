var App = App || {};
console.log('App in AuthModule :', App)

App.AuthModule = (function () {
    var TEMPLATES_URL = "./templates";
    var FORMS_URL = TEMPLATES_URL + "/formulaire.html";
    var LOISIR_URL = TEMPLATES_URL + "/escalade.html";
    var BACK_URL = 'https://loisirs-web-backend.cleverapps.io/users';


    var start = function () {
        $(document).ready(function () {
            if (isLoggedIn()) {
                loadInnerHtml(LOISIR_URL);
            } else {
                loadInnerHtml(FORMS_URL);
            }
        })
    }
    /** return true if the cookie logged_in is set and equal to "true" */
    var isLoggedIn = function () {
        return getCookie('logged_in') === "true";
    }

    /** Logout the user */
    var logout = function () {
        setCookie("logged_in", "false")
        localStorage.setItem("username", null)
        loadInnerHtml(FORMS_URL);
    }

    /** Login the user */
    var login = function (user) {
        console.log('login called')
        var user = getJsonFromForm('login');
        if (isValid(user)) {
            $.get(BACK_URL + '/?name=' + user.name).then(resp => {
                if (resp && resp[0]) {
                    if (resp[0].password == user.password) {
                        console.log('connected !!!')
                        loadInnerHtml(LOISIR_URL);
                        setCookie("logged_in", "true")
                        localStorage.setItem("username", user.name)
                    } else {
                        showErrorAlert("Mauvais mot de passe pour " + user.name + " !")
                    }
                } else {
                    showErrorAlert("L'utilisateur " + user.name + " n'existe pas !")
                }
            })
        }
    }

    /** Créer un utilisateur (inscription) */
    var create = function () {
        console.log('create called')
        let user = getJsonFromForm('create');
        if (isValid(user)) {
            $.get(BACK_URL + '/?name=' + user.name).then(resp => {
                if (resp.length == 0) {
                    $.post(BACK_URL, user).then(resp => {
                        loadInnerHtml(LOISIR_URL);
                        localStorage.setItem("username", user.name)
                    })
                } else {
                    showErrorAlert("L'utilisateur " + user.name + " existe déjà !")
                }
            })
        }
    }

    /** Fill the <main> element with the template specified by the input url  */
    var loadInnerHtml = function (url) {
        var body = '';
        $.get(url).then(resp => {
            document.querySelector('main').innerHTML = resp;
            if (url == LOISIR_URL) {
                App.ClimbModule.initTemplate();
                App.CommentsModule.addCommentsEvents();
                $('nav li button').on('click', function () {
                    logout()
                })
            } else {
                $('#create_button').on('click', function () {
                    create()
                })
                $('#login_button').on('click', function () {
                    login()
                })
            }
        })
    }

    var getJsonFromForm = function (str) {
        let obj = {
            name: $('#' + str + ' input[name="name"]')[0].value,
            password: $('#' + str + ' input[name="password"]')[0].value
        };
        console.log('user created : ', obj)
        return obj;
    }
    var isValid = function (user) {
        if (user && user.name && user.password && user.name != "" && user.password != "") {
            return true;
        } else {
            showErrorAlert('Formulaire incomplet')
            return false;
        }
    }
    var showErrorAlert = function (msg) {
        console.log(msg)
        $('<div class="alert alert-danger fade show" role="alert" id="error-alert"><span><p>' + msg + '</p></span></div>').appendTo('#alert_placeholder');
        setTimeout(() => {
            $('#error-alert').alert('close')
        }, 1000);
    }

    /** Set cookie */
    var setCookie = function (cname, cvalue) {
        document.cookie = cname + "=" + cvalue + ";" + ";path=/escalade/";
    }
    /** Get cookie */
    var getCookie = function (cname) {
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
    return { start };
})();


