let BACK_URL = 'http://loisirs-web-backend.cleverapps.io/users';



function login() {
    console.log('login called')
    let user = getJsonFromForm('login');
    console.log(user)
    $.get(BACK_URL + '/?name=' + user.name).then(resp => {
        if (resp && resp[0]) {
            if (resp[0].password == user.password) {
                console.log('connected !!!')
                location.href = "escalade.html";
            } else {
                showErrorAlert("Mauvais mot de passe pour " + user.name + " !")
            }
        } else {
            showErrorAlert("L'utilisateur " + user.name + " n'existe pas !")
        }
    })
}

function create() {
    console.log('create called')
    let user = getJsonFromForm('create');
    console.log(user)
    $.get(BACK_URL + '/?name=' + user.name).then(resp => {
        if (resp.length == 0) {
            $.post(BACK_URL, user).then(resp => {
                location.href = "escalade.html";
            })
        } else {
            showErrorAlert("L'utilisateur " + user.name + " existe déjà !")
        }
    })
}

function getJsonFromForm(str) {
    let form = document.getElementById(str);
    var FD = new FormData(form);
    let obj = {};
    for (var pair of FD.entries()) {
        obj[pair[0]] = pair[1];
    }
    return obj;
}

function showErrorAlert(msg) {
    console.log(msg)
    $('<div class="alert alert-danger fade show" role="alert" id="error-alert"><span><p>' + msg + '</p></span></div>').appendTo('#alert_placeholder');
    setTimeout(() => {
        $('#error-alert').alert('close')
    }, 1000);
}