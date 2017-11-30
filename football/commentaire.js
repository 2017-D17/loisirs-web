function getwords() {
    var commentaire = {
        message: document.getElementById("words").value,
        user: getCookie("userName"),
        date: new Date()
    }

    var commentaireSTR = localStorage.getItem("message");
    var commentaire = [];



    document.getElementById("comments").innerHTML = localStorage.getItem("words");
}