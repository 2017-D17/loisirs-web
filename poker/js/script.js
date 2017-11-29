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


// Sending and receiving data in JSON format using POST method
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
            alert("Tu est bien connecté !");
            setCookie("userConnected", trouve, 30);                
            window.location.replace("http://127.0.0.1:8080/poker/template/histoire.html");
        }
    };

    xhr.open("GET", url, true);
    xhr.send();

});


$('#deconnexion').on('click', function (e) {
    
    setCookie("userConnected", "", 30);      
    
});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/poker/";
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
    console.log("check check check");
    var connected = getCookie("userConnected");
    if (!connected) {
        window.location.replace("http://127.0.0.1:8080/poker");
    }
}

/*function addMainBlock() {

    var connected = getCookie("userConnected");

    $("#main").empty();

    if (connected) {
        $.get("template/formOut.html").then(resp => {
            document.getElementById('main').innerHTML = resp;
        })
    }

    else {
        $.get("template/formIn.html").then(resp => {
            document.getElementById('main').innerHTML = resp;
        })
    }
}*/


function addMainBlock() {

    var connected = getCookie("userConnected");

    if (connected=="true") {
        $("#main1").hide();
        $("#main2").show();
    }
    else {
        $("#main1").show();
        $("#main2").hide();
    }
}