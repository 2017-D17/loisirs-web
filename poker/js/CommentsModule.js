var CommentsModule = (function () {

    var addComment = function () {
        $('#comment').on('click', function (e) {
            e.preventDefault();
            // Check browser support
            if (typeof (Storage) !== "undefined") {

                var commentaire = {
                    message: document.getElementById("message").value,
                    user: App.AuthModule.getCookie("userName"),
                    date: new Date()
                }

                document.getElementById("message").value = "";

                let comments = getAllComments();

                comments.push(commentaire);

                localStorage.setItem("message", JSON.stringify(comments));

                displayComments(comments);
            } else {
                document.getElementById("commentaires").innerHTML = "Sorry, your browser does not support Web Storage...";
            }
        });
    }

    var getAllComments = function () {
        var comStr = localStorage.getItem("message");
        var comments = [];
        if (comStr) {
            comments = JSON.parse(comStr)
        }
        return comments;
    }

    var displayComments = function (comments) {

        var commentaires = '';
        comments.forEach(c => {
            commentaires += `<div class="row">
                            <div class="col s12">
                                <div class="card-panel teal">
                                    <span class="card-title">${c.user} le ${c.date}</span>
                                    <p class="white-text">${c.message}</p>
                                </div>
                            </div>
                        </div>`;
        })
        document.getElementById("commentaires").innerHTML = commentaires;
    }

    return {
        addComment: addComment,
        getComments: getAllComments,
        displayComments: displayComments
    };

})()