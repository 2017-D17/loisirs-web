
/* Logout */
var PageRedirection = (function(){
    var self = {};

    //methodes publiques

    self.redirection = function(){
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
                        var currentUrl = document.location.href;
                        createCookie("previousUrl",currentUrl,1);
                    }
                }
            } 
            var currentUrl = getCurrentRelativeUrl();
            createCookie("previousUrl",currentUrl,1);
    }

    self.getCurrentRelativeUrl = function() {
        var currentUrlPathName = window.location.pathname;
        var splitedUrl = currentUrlPathName.split("/randonnee/");
        return splitedUrl[1];
    }

    return self;
})();


/* cookies */

var Cookies = (function(){
    var self = {};

    //methodes publiques
    self.createCookie = function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };

    self.createCookieIfNotExists = function(name,value,days) {
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
    };

    /*read cookies */
    self.readCookie = function(name) {
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
    };

    /* delete cookie */
    self.eraseCookie = function(name) {
        createCookie(name,"",-1);
    };

    return self;
})();

/* Session */
var Session = (function(){
    var self = {};

    //methodes publiques

    self.getSession = function() {
        var session = {
            log_in: readCookie('log_in'),
            username: readCookie('username'),
        }
        return session;
    };

    return self;
})();

/* Login */
var Login = (function(){
    var self = {};

    //methodes publiques

    self.login = function() {
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
                    Cookies.createCookie('log_in','true',1);
                    Cookies.createCookie('username',user.name,1);
                    var session = Session.getSession();
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
    return false;
};

return self;
})();

/* Logout */
var Logout = (function(){
    var self = {};

    //methodes publiques

    self.deconnection = function(){
        eraseCookie('log_in');
        eraseCookie('username');
        document.location = "../index.html";
        return false;
    }

    return self;
})();

/* Logout */
var Register = (function(){
    var self = {};

    //methodes publiques

    self.register = function(){
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

    return self;
})();