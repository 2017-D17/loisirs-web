
/* Redirection */
var PageRedirectionModule = (function(){
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


/* Cookies */

var CookiesModule = (function(){
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
var SessionModule = (function(){
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
var LoginModule = (function(){
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
                    CookiesModule.createCookie('log_in','true',1);
                    CookiesModule.createCookie('username',user.name,1);
                    var session = SessionModule.getSession();
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
var LogoutModule = (function(){
    var self = {};

    //methodes publiques

    self.deconnection = function(){
        CookiesModule.eraseCookie('log_in');
        CookiesModule.eraseCookie('username');
        document.location = "../index.html";
        return false;
    }

    return self;
})();

/* Register */
var RegisterModule = (function(){
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
                            CookiesModule.createCookie('log_in','true',1);
                            CookiesModule.createCookie('username',user.name,1);
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

/* Storage */
var StorageModule = (function(){
    var self = {};

    //methodes publiques

    self.storageAvailable = function(type){
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    };

    return self;
})();

/* Comments */
var CommentsModule = (function(){
    var self = {};

    //methodes publiques

    self.createCommentTemplate = function(userName,dateTime,comment) {
        return template = "<div style=\"margin-bottom: 25px\" class=\"input-group\"><span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\">"+
        "</i></span><div class=\"form-control comment-div\"><div class=\"commentHeader\"><p style=\"position: absolute; font-weight: bold;\" class=\"panel-title\">" 
        + userName + "</p><p style=\"right: 22px; position: absolute;\" class=\"panel-title\">" + dateTime + "</p></div><p style=\"margin-top: 30px;\">" + comment + "</p></div></div>";
    };

    self.addComment = function(page) {
        var message = $('#message').val();
        if(message != null) {
            var date = DateUtilsModule.getFormattedDateTime();
            var session = SessionModule.getSession();
            var username = session.username;
            var comment = {
                username: username,
                date: date,
                message: message
            };
            var comments = [];
            switch(page) {
                case "home": 
                    if(JSON.parse(localStorage.getItem('homeComments')) != null) {
                        comments = JSON.parse(localStorage.getItem('homeComments'));
                    }
                    comments.push(comment);
                    localStorage.setItem('homeComments',JSON.stringify(comments));
                break;
                case "material": 
                    if(JSON.parse(localStorage.getItem('materialComments')) != null) {
                        comments = JSON.parse(localStorage.getItem('materialComments'));
                    }
                    comments.push(comment);
                    localStorage.setItem('materialComments',JSON.stringify(comments));
                break;
            }
            
        } else {
            alert("Aucun commentaire n'est saisi");
        }
        getComments(page);
        $('#message').val("");
    };

    self.getComments = function(page) {
        if (StorageModule.storageAvailable('localStorage')) {
            $('#commentsList').empty();
            var comments = [];
            switch(page) {
                case "home": comments = JSON.parse(localStorage.getItem('homeComments'));
                break;
                case "material": comments = JSON.parse(localStorage.getItem('materialComments'));
                break;
            }
            if(comments != null) {
                  for(var i=0;i<comments.length;i++) {
                      var template = createCommentTemplate(comments[i].username,comments[i].date,comments[i].message);
                      $('#commentsList').append(template);
                    }
            }
        }
        else {
          // Too bad, no localStorage for us
          alert('pas de localStorage sur ce navigateur!');
        }

    };

    return self;
})();

/* Date Utils */
var DateUtilsModule = (function(){
    var self = {};

    //methodes publiques

    self.getFormattedDateTime = function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();

        if(dd<10) {
            dd = '0'+dd
        } 

        var month = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];

        today = dd + ' ' + month[mm] + ' ' + yyyy + ' ' + hh + ':' + min + ':' + sec ;
        return today;
    };

    return self;
})();

/* Carousel */
var CarouselModule = (function(){
    var self = {};
    var myCarousel = $("#myCarousel");
    var item1 = $(".item1");
    var item2 = $(".item1");
    var item3 = $(".item1");
    var item4 = $(".item1");
    var left = $(".left");
    var right = $(".right");

    //methodes publiques
    self.init = function(){
        // Enable Carousel Indicators
         myCarousel.carousel();
         // Enable Carousel Controls
         left.onclick = onClickLeft;
         right.onclick = onClickRight;
    };


    function onClickLeft(){
        //utilisation d'un autre module :)
        myCarousel.carousel("prev");
    }

    function onClickRight(){
        //utilisation d'un autre module :)
        myCarousel.carousel("next");
    }

    return self;
})();