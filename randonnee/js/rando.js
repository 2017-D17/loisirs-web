/* server url */
var serverUrl = 'https://loisirs-web-backend.cleverapps.io/users';

redirection();
// var relativeUrl = getCurrentRelativeUrl();
// createCookieIfNotExists("previousUrl",relativeUrl,1);


/*****************************BACK END FUNCTIONS *****************************/

/* url */
function getCurrentRelativeUrl() {
    var currentUrlPathName = window.location.pathname;
    var splitedUrl = currentUrlPathName.split("/randonnee/");
    return splitedUrl[1];
}


/* cookies */

/* test if user logged and redirect page */
function redirection() {
    var url = readCookie('previousUrl');
    var currentRelativeUrl = getCurrentRelativeUrl();
    console.log('url', url);
    console.log('relativeUrl', currentRelativeUrl);
    if(url != currentRelativeUrl) {
        
        if(currentRelativeUrl == "index.html" || currentRelativeUrl == "") {
            var session = getSession();
            /* test if user logged */
            if(session.log_in != null && session.username != null) {
                document.location = "templates/home.html";
                var currentUrl = getCurrentRelativeUrl();
                createCookie("previousUrl",currentUrl,1);
            }
        } else {
            /* test if user logged */
            var session = getSession();
            if(session.log_in == null && session.username == null) {
                document.location = "../index.html";
                var currentUrl = getCurrentRelativeUrl();
                createCookie("previousUrl",currentUrl,1);
            }
        }
    } 
    var currentUrl = getCurrentRelativeUrl();
    createCookie("previousUrl",currentUrl,1);
}



/* get session from cookies */
function getSession() {
    var session = {
        log_in: readCookie('log_in'),
        username: readCookie('username'),
    }
    return session;
}

/* create cookie */

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function createCookieIfNotExists(name,value,days) {
    var res = readCookie(name);
    if(res == null ){
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else {
            var expires = "";
        } 
        document.cookie = name+"="+value+expires+"; path=/";
    }
}

/*read cookies */
function readCookie(name) {
    var key = name + "=";
    var cookies = document.cookie.split(';');
    var cookieValue = null;
    for(var i=0;i < cookies.length;i++) {
        var cookie = cookies[i];
        /* delete space before name */
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1,cookie.length);
        } 
        if (cookie.indexOf(key) == 0) {
            cookieValue = cookie.substring(key.length,cookie.length);
        }
    }
    return cookieValue;
}

/* delete cookie */
function eraseCookie(name) {
    createCookie(name,"",-1);
}


/* deconnexion */
function deconnection(){
    eraseCookie('log_in');
    eraseCookie('username');
    document.location = "../index.html";
}

/* login function */
function login() {
    console.log('login');
    /* get params from form */
    var user = {
        name: $('input[name="username"]').val(),
        password: $('input[name="password"]').val()
    };
    console.log(user);
    /* test if params exist */
    if(user.name != "" && user.password != "") {
        $.get( serverUrl + '/?name=' + user.name, function( data ) {
          console.log( "Data Loaded: ", data );
          if(data.length > 0 ) {
            if(data[0].password == user.password){
                createCookie('log_in','true',1);
                createCookie('username',user.name,1);
                var session = getSession();
                console.log( "connected" );
                document.location = "templates/home.html";
            }else {
                alert("le mot de passe est incorrect");
            }

          } else {
            alert("le nom saisi n'est pas reconnu");
          }
        }).fail(function() {
            console.log( "error get" );
        });
    } else {
        alert('tous les champs doivent être saisis');
    }
}

/* register function */
function register() {
    console.log('register');
    /* get params from form */
    var user = {
        name: $('input[name="uname"]').val(),
        password: $('input[name="passwd"]').val()
    };
    console.log(user);

    /* test if params exist */
    if(user.name != "" && user.password != "") {
        /* test if user exists  */
        $.get( serverUrl + '/?name=' + user.name, function( data ) {
          console.log( "Data Loaded: ", data );
          console.log("data size ", data.length);
          if(data.length > 0 && data[0].password == user.password) {
            console.log( "user already exists" );
            alert("Vous êtes déjà inscrits");
            document.location = "index.html";
          } else {
            console.log( "user does not exist" );
            /*insert user into db.json (server) */
            $.post( serverUrl, user).done(function( data ) {
                createCookie('log_in','true',1);
                createCookie('username',user.name,1);
                document.location = "templates/home.html";
            }).fail(function() {
                console.log( "error post" );
            });

          }
        }).fail(function() {
            console.log( "error get" );
        });
    } else {
        alert('tous les champs doivent être saisis');
    }
}



/***************************** FRONT END FUNCTIONS *****************************/

// Activate Carousel
$("#myCarousel").carousel();

// Enable Carousel Indicators
$(".item1").click(function(){
    $("#myCarousel").carousel(0);
});
$(".item2").click(function(){
    $("#myCarousel").carousel(1);
});
$(".item3").click(function(){
    $("#myCarousel").carousel(2);
});
$(".item4").click(function(){
    $("#myCarousel").carousel(3);
});

// Enable Carousel Controls
$(".left").click(function(){
    $("#myCarousel").carousel("prev");
});
$(".right").click(function(){
    $("#myCarousel").carousel("next");
});

