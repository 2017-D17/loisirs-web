/* server url */
var serverUrl = 'https://loisirs-web-backend.cleverapps.io/users';

/**** BACK END FUNCTIONS ****/
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
          console.log("data size ", data.length);
          if(data.length > 0 ) {
            if(data[0].password == user.password){
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
            document.location = "templates/home.html";
          } else {
            console.log( "user does not exist" );
            /*insert user into db.json (server) */
            $.post( serverUrl, user).done(function( data ) {
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

