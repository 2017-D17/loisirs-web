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
	console.log(window.localStorage.comments)
	var comments = []
	if (window.localStorage.comments != "") {
		comments = JSON.parse(window.localStorage.comments);
		console.log("fuck");
		console.log(comments);

		for (c in comments) {
			//$('#commentaires').addChild(c);
			console.log(c);
		}


	} else {
		document.getElementById('commentaires').innerText = "Pas de commentaire."
	}
}

function postComment(event) {
	event.preventDefault();
	var date = new Date();
	date = date.toLocaleString("fr-FR", {day : "numeric", month: "long", year: "numeric", hour:"numeric", minute:"numeric"});
	var com = { "author": readCookie("username"), "text": document.getElementById("comment").value, "date" : date}
	console.log(com)
	if (window.localStorage.comments == "") {
		window.localStorage.comments = JSON.stringify(com);
	} else {
		var comments = JSON.parse(window.localStorage.comments);
		comments.push(JSON.parse(com));
		window.localStorage.comments = JSON.stringify(window.localStorage.comments);
	}
	return false;
}