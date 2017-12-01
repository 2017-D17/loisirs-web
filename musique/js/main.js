$(document).ready(function () {
    let logged_in = getCookie('username')
    if (logged_in != "") { //Charger la page membre
        //loadInnerHtml(LOISIR_URL);
        location.href = "home.html"
    } else { //Charger la page d'accueil
        //loadInnerHtml(FORMS_URL);
        console.log("pas connecté")
    }
})


function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";"
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



function inscription(e) {
	e.preventDefault();
	var nom = document.getElementById('ins_nom').value;
	var pwd = document.getElementById('ins_pwd').value;

	if(nom.length > 0 && pwd.length > 0) {
		var json = $.getJSON("https://loisirs-web-backend.cleverapps.io/users/?name=" + nom).then(response => {
							console.log(response);
							if (response.length > 0) {
								document.getElementById('ins_result').innerText = " Cet utilisateur est déjà inscrit";
							} else {
								var data = {"name" : nom, "password" : pwd};
								console.log(data);
								$.post("https://loisirs-web-backend.cleverapps.io/users", data).then(function(data){
									document.cookie = "username="+nom;
								location.href = "home.html"
							}, function(error){
									
								
							});
						}
					});
	} else {
		if (nom === "") {
			document.getElementById('ins_result').innerText = " Le nom ne peut pas être vide";	
		} else {
			document.getElementById('ins_result').innerText = " Le mot de passe ne peut pas être vide";	
		}
	}
}	

function connexion(e) {
	e.preventDefault();
	var nom = document.getElementById('con_nom').value;
	var pwd = document.getElementById('con_pwd').value;
	var data = {"name" : nom, "password" : pwd};

	console.log(json);

	if(nom.length > 0 && pwd.length > 0) { //validation de l'input
		var json = $.getJSON("https://loisirs-web-backend.cleverapps.io/users/?name=" + nom).then(response => {
							if (response.length == 0) {
							document.getElementById('con_result').innerText = " Utilisateur inconnu";
							} else {
								if(response[0].password == pwd) {
									console.log("yay");
									document.cookie = "username="+nom; 
									location.href = "home.html";
								} else {
									document.getElementById('con_result').innerText = " Mot de passe incorrect";
								}
							}
						}
					);


	} else {
		if (nom === "") {
			document.getElementById('con_result').innerText = " Le nom ne peut pas être vide";	
		} else {
			document.getElementById('con_result').innerText = " Le mot de passe ne peut pas être vide";	
		}
	}
}	