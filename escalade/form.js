let BACK_URL = 'http://loisirs-web-backend.cleverapps.io/users';

function login() {
    console.log('login called')
    let user = getJsonFromForm('login');
    console.log(user)
    $.get(BACK_URL + '/?name=' + user.name).then(resp => {
        if (resp && resp[0] && resp[0].password == user.password) {
            console.log('connected !!!')
            //location.href = "escalade.html";
        } else {
            console.log('error connecting ! ', resp)
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
            alert('user already exist !')
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
