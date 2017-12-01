var App = App || {};
console.log('App in CommentsModule :', App)

App.CommentsModule = (function () {
    // Sur la ligne suivante, vous devez inclure les préfixes des implémentations que vous souhaitez tester.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // N'UTILISEZ PAS "var indexedDB = ..." si vous n'êtes pas dans une fonction.
    // De plus, vous pourriez avoir besoin de réferences à des objets window.IDB*:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
    // (Mozilla n'a jamais préfixé ces objets, donc nous n'avons pas besoin de window.mozIDB*)

    if (!window.indexedDB) {
        window.alert("Votre navigateur ne supporte pas une version stable d'IndexedDB. Quelques fonctionnalités ne seront pas disponibles.")
    }

    const dbName = "Comments";
    let db = new Dexie("comments_database");
    db.version(1).stores({
        comments: '++id,name,text,date,timestamp'
    });
    var addCommentsEvents = function () {
        initCommentsView();
        $("#inputComment").on("input propertychange", function () {
            ($(this).val() === "") ? $("#comments_textarea button").prop("disabled", true) : $("#comments_textarea button").prop("disabled", false);
        })
        $("#comments_textarea button").on("click", () => {
            let comm = $("#inputComment").val();
            if (comm === "") { return }
            $("#inputComment").val("");
            $("#comments_textarea button").prop("disabled", true)
            console.log("saving the comment : ", comm)
            let today = new Date()
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', 'second': '2-digit' };
            let comment = {
                text: comm,
                name: localStorage.getItem("username"),
                date: today.toLocaleDateString('fr-FR', options),
                timestamp: today.getTime()
            }
            db.comments.add(comment).then(
                updateCommentsView(comment)
            ).catch(e => { console.error(e) })
        })
    }

    var updateCommentsView = function (comment) {
        $('#comments_section').prepend(
            `<div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">`+ comment.name + `</h5>
                    <small>`+ comment.date + `</small>
                </div>
            <p class="mb-1">`+ comment.text + `</p>
            </div>`
        )
    }

    var initCommentsView = function () {
        db.comments.orderBy("timestamp").each((comment) => {
            updateCommentsView(comment)
        })
    }
    return { addCommentsEvents }
})()