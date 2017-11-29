

function inscription() {
    console.log("inscription en cours")
    // Get some values from elements on the page:
    var $form = $(this);
    var nom = document.getElementById("inputName").value;
    var motpass = document.getElementById("inputPassword").value;
    console.log("name = " + nom + " et passs = " + motpass)
    // Send the data using post
    var url = "http://loisirs-web-backend.cleverapps.io/users";
    $.post(url, { "name": nom, "password": motpass }).then(resp => {
        console.log(resp)
    })
}



