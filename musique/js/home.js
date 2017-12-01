$(document).ready(function () {
	var username = readCookie("username");
	document.getElementById("welcome").innerText += " " + username;
	displayComments();

})

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";"
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// utility functions for localstorage
function setObject(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
function getObject(key) {
  var storage = window.localStorage,
  value = storage.getItem(key);
  return value && JSON.parse(value);
}
function clearStorage() {
  window.localStorage.clear();
}


function deconnecter(e) {
	document.cookie = "username" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	location.href = "index.html"
}

function displayComments() {
	var comments = [];
	if (window.localStorage.comments != "") {
		comments = JSON.parse(window.localStorage.comments);
		console.log(comments.length + " commentaires")
		for (var c = comments.length-1; c >= 0; c--) {
			$('#commentaires').append("<div class='card' style='margin-left: 1cm' style='margin-right: 1cm'> <div class='card-body'><h4 class='card-title'>" + comments[c].author + "</h4> <p>" + comments[c].text + "</p><p style='font-size:10px'>" + comments[c].date + "</div></div>");
		}
	} else {
		document.getElementById('commentaires').innerText = "Pas de commentaire."
	}
}

function postComment(event) {
	event.preventDefault();
	if (document.getElementById("comment").value.trim() === "") {
		document.getElementById("comment_result").innerHTML = "Vous ne pouvez pas poster un commentaire vide."
	} else {
		var date = new Date();
		date = date.toLocaleString("fr-FR", {day : "numeric", month: "long", year: "numeric", hour:"numeric", minute:"numeric"});
		var com = { "author": readCookie("username"), "text": document.getElementById("comment").value, "date" : date}
		if (window.localStorage.comments == "") {
			window.localStorage.comments = JSON.stringify([com]);
		} else {
			var comments = JSON.parse(window.localStorage.comments);
			comments.push(com);
			window.localStorage.comments = JSON.stringify(comments);
		}
		window.location.reload();
	}
	return false;
}