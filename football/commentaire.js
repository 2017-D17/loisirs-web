function storageWords() {

    var comment = {
        message: document.getElementById("words").value,
        user: getCookie("username"),
        date: new Date().toISOString().slice(0, 10),
    }

    var commentsStr = localStorage.getItem("comments");

    var comments = commentsStr ? JSON.parse(commentsStr) : [] //string en objet

    comments.push(comment)

    var commentSTR = localStorage.setItem("comments", JSON.stringify(comments)); // objet en string

    displayWords();

    return comments;

}

function displayWords() {

    var commentsStr = localStorage.getItem("comments");

    var comments = commentsStr ? JSON.parse(commentsStr) : []
    document.getElementById("comments").innerHTML = comments.map(function (com) {
        return "<div>" + com.user + " : " + com.message + " / " + com.date + "</div>"
    });;
}

displayWords();

