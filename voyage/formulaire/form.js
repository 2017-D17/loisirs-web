
function register(event) {
    event.preventDefault();

    console.log("inscription en cours")

    // Get some values from elements on the page:

    var $form = $(this);

    var username = document.getElementById("username1").value;

    var password = document.getElementById("password1").value;

    console.log("name = " + username + " et passs = " + password)

    // Send the data using post

    var url = "http://loisirs-web-backend.cleverapps.io/users";

    $.post(url, { "name": username, "password": password }).then(resp => {

        console.log(resp)

    })

}
jQuery(function () {

    var nom = $("#username");
    valid = false;
    /* je verifie que le champs n'est pas vide et j'applique une classe et j'affiche la div error*/
    $("#username").blur(function () {
        if ($("#username").val() == "") {
            nom.next(".error").show().text("Le champ Nom  est obligatoire ");

            valid = false;
        }
        else { valid = true }
    });

    $("#password").blur(function () {
        if ($("#password").val() == "") {
            nom.next(".error").show().text("Le champ Nom  est obligatoire ");

            valid = false;
        }
        else { valid = true }
    });

    $("#button").click(function (e) {
        e.preventDefault()
        if (valid == true)

            location = "/voyage";

        else

            alert("les champs username et password sont obligatoires")

    });

})



