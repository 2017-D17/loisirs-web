/* server url */
var serverUrl = 'http://loisirs-web-backend.cleverapps.io/users';
var localServerUrl = '127.0.0.1:8080/users';

/**** BACK END FUNCTIONS ****/
/* login function */
function login() {
    console.log('login');
    var user = {
        name: $('input[name="username"]').val(),
        password: $('input[name="password"]').val()
    };
    console.log(user);
    if(user.name != "" && user.password != "") {
        $.get( serverUrl + '/?name=' + user.name, function( data ) {
          console.log( "Data Loaded: ", data );
          console.log("data size ", data.length);
          if(data.length > 0 ) {
            if(data[0].password == user.password){
                console.log( "connected" );
                window.location.replace("templates/home.html");
            }else {
                alert("le mot de passe est incorrect");
            }

          } else {
            alert("le nom saisi n'est pas reconnu");
          }
        }).fail(function() {
            console.log( "error" );
        });
    } else {
        alert('tous les champs doivent être saisis');
    }
}

/* register function */
function register() {
    console.log('register');
    var user = {
        name: $('input[name="uname"]').val(),
        password: $('input[name="passwd"]').val()
    };
    console.log(user);
    
    if(user.name != "" && user.password != "") {
        /* test if user exists  */
        $.get( localServerUrl + '/?name=' + user.name, function( data ) {
          console.log( "Data Loaded: ", data );
          console.log("data size ", data.length);
          if(data.length > 0 && data[0].password == user.password) {
            console.log( "user already exists" );
            alert("Vous êtes déjà inscrits");
            window.location.replace("index.html");
          } else {
            console.log( "user does not exist" );
            /*insert user into db.json */
            $.post( localServerUrl, user).done(function( data ) {
                alert( "Data Loaded: " + data );
                window.location.replace("templates/home.html");
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



/**** FRONT END FUNCTIONS ****/
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

