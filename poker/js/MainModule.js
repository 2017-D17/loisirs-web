

$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        }
        else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});


$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});


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

    alert("Tu est bien inscrit " + document.getElementById("name").value + ", connect toi !!");

});


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
            window.location.replace("http://127.0.0.1:8080/poker/template/home.html");
        }
    };

    xhr.open("GET", url, true);
    xhr.send();

});

$('#deconnexion').on('click', function (e) {
    setCookie("userConnected", "");
});

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

$('#comment').on('click', function (e) {
    e.preventDefault();
    // Check browser support
    if (typeof (Storage) !== "undefined") {

        var commentaire = {
            message: document.getElementById("message").value,
            user: getCookie("userName"),
            date: new Date()
        }

        document.getElementById("message").value = "";

        let comments = getAllComments();

        comments.push(commentaire);

        localStorage.setItem("message", JSON.stringify(comments));

        displayComments(comments);
    } else {
        document.getElementById("commentaires").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
});


function getAllComments() {
    var comStr = localStorage.getItem("message");
    var comments = [];
    if (comStr) {
        comments = JSON.parse(comStr)
    }
    return comments;
}

function displayComments(comments) {

    var commentaires = '';
    comments.forEach(c => {
        commentaires += `<div class="row">
                            <div class="col s12">
                                <div class="card-panel teal">
                                    <span class="card-title">${c.user} le ${c.date}</span>
                                    <p class="white-text">${c.message}</p>
                                </div>
                            </div>
                        </div>`;
    })
    document.getElementById("commentaires").innerHTML = commentaires;
}


var initModule = (function () {
    var deconnexionPrivee = function () {

    }

    var deconnexionPrivee2 = function () {

    }

    var connexion = function () {

    }

    return {
        dex: deconnexionPrivee2,
        con: connexion
    }

})();


initModule.dex()
initModule.con()

var secondModule = (function () {


    return {
        uneChose: function () {

        }
    }

})();

var troisiemeModule = (function (titi) {


    return {
        uneAutreChose: function () {

        }
    }

})(secondModule);

function quatreModule(secModule) {


    return {
        uneAutreChose: function () {

        }
    }

}

quatreModule(secondModule)

    (function (secModule) {


        return {
            uneAutreChose: function () {

            }
        }

    })(secondModule)
