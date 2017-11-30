const TEMPLATES_URL = "./templates";
const FORMS_URL = TEMPLATES_URL + "/formulaire.html";
const LOISIR_URL = TEMPLATES_URL + "/escalade.html";
const BACK_URL = 'https://loisirs-web-backend.cleverapps.io/users';


$(document).ready(function () {
    let logged_in = getCookie('logged_in')
    if (logged_in === "true") {
        loadInnerHtml(LOISIR_URL);
    } else {
        loadInnerHtml(FORMS_URL);
    }
})

function loadInnerHtml(url) {
    let body = '';
    $.get(url).then(resp => {
        document.querySelector('main').innerHTML = resp;
        if (url == LOISIR_URL) {
            initCarousel();
            initScroll();
            addCommentsEvents();
        }
    })
}

function login() {
    console.log('login called')
    let user = getJsonFromForm('login');
    if (isValid(user)) {
        $.get(BACK_URL + '/?name=' + user.name).then(resp => {
            if (resp && resp[0]) {
                if (resp[0].password == user.password) {
                    console.log('connected !!!')
                    loadInnerHtml(LOISIR_URL);
                    setCookie("logged_in", "true")
                    localStorage.setItem("username", user.name)
                } else {
                    showErrorAlert("Mauvais mot de passe pour " + user.name + " !")
                }
            } else {
                showErrorAlert("L'utilisateur " + user.name + " n'existe pas !")
            }
        })
    }
}

function create() {
    console.log('create called')
    let user = getJsonFromForm('create');
    if (isValid(user)) {
        $.get(BACK_URL + '/?name=' + user.name).then(resp => {
            if (resp.length == 0) {
                $.post(BACK_URL, user).then(resp => {
                    loadInnerHtml(LOISIR_URL);
                    localStorage.setItem("username", user.name)
                })
            } else {
                showErrorAlert("L'utilisateur " + user.name + " existe déjà !")
            }
        })
    }
}

function getJsonFromForm(str) {
    let obj = {
        name: $('#' + str + ' input[name="name"]')[0].value,
        password: $('#' + str + ' input[name="password"]')[0].value
    };
    console.log('user created : ', obj)
    return obj;
}

function showErrorAlert(msg) {
    console.log(msg)
    $('<div class="alert alert-danger fade show" role="alert" id="error-alert"><span><p>' + msg + '</p></span></div>').appendTo('#alert_placeholder');
    setTimeout(() => {
        $('#error-alert').alert('close')
    }, 1000);
}

function isValid(user) {
    if (user && user.name && user.password && user.name != "" && user.password != "") {
        return true;
    } else {
        showErrorAlert('Formulaire incomplet')
        return false;
    }
}

function initCarousel() {

    let linksToImages = [
        'media/escalade-8.jpg',
        'media/sean-escalade.jpg',
        'https://image.redbull.com/rbcom/010/2015-04-09/1331716034694_2/0012/0/0/240/1799/2939/1500/1/chris-sharma-makes-the-first-ascent-of-el-bon-combat-near-barcelona-spain.jpg',
        'media/news-chinajam-11.jpg',
        'http://www.escalade-lyon.fr/wp-content/uploads/2017/08/P8011763.jpg'
    ]

    linksToImages.forEach((l, i) => {
        $('<div class="carousel-item"><img class="d-block w-100" src="' + l + '" alt="First slide"></div>').appendTo('.carousel-inner');
        $('<li data-target="#carouselEscalade" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')
    })
    $('.carousel-item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
}

function initScroll() {
    $(document).on("scroll", onScroll);

    let navHeight = $('nav').height();
    let navOffset = 20;
    console.log('navheight : ', navHeight)
    $('body').css('padding-top')
    $(window).resize(function () {
        navHeight = $('nav').height();
    });

    $('body').scrollspy({ target: '#nav-escalade' })

    $("#nav-escalade a[href^='#']").on('click', function (e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        let hash = this.hash;
        console.log("hash : ", hash)
        // animate
        console.log("hash offset : ", $(hash).offset())
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - navHeight - navOffset
        }, 300, function () {
        });

    });
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('#nav-escalade a').not('.deconnexion').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            var elemPos = refElement.position().top - navHeight - navOffset;
            if (elemPos <= scrollPos && elemPos + refElement.height() > scrollPos) {
                $('#nav-escalade ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }
}

function logout() {
    setCookie("logged_in", "false")
    localStorage.setItem("username", null)
    loadInnerHtml(FORMS_URL);
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + ";path=/escalade/";
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