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
    comments: '++id,name,text,date'
});

function addCommentsEvents() {
    initCommentsView();
    $("#inputComment").on("input propertychange", function () {
        ($(this).val() === "") ? $("#comments_textarea button").prop("disabled", true) : $("#comments_textarea button").prop("disabled", false);
    })
    $("#comments_textarea button").on("click", () => {
        console.log("saving the comment : ")
        let comment = {
            text: $("#inputComment").val(),
            name: localStorage.getItem("username"),
            date: new Date().toLocaleDateString()
        }
        db.comments.add(comment).then(
            updateCommentsView(comment)
        ).catch(e => { console.error(e) })
    })
}

function updateCommentsView(comment) {
    $(`<div class="list-group-item list-group-item-action flex-column align-items-start">
<div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">`+ comment.name + `</h5>
    <small>`+ comment.date + `</small>
</div>
<p class="mb-1">`+ comment.text + `</p>
</div>`).appendTo('#comments_section')
}

function initCommentsView() {
    db.comments.each((comment) => {
        updateCommentsView(comment)
    })
}