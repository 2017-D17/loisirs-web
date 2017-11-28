$(document).ready(function () {

    let navHeight = $('nav').height();
    $('body').css('padding-top', + navHeight + 15 + 'px');
    $(window).resize(function () {
        navHeight = $('nav').height();
        $('body').css('padding-top', + navHeight + 15 + 'px');
    });


    $('body').scrollspy({ target: '#nav-escalade' })

    $(".navbar ul li a[href^='#']").not('[href="#"]').on('click', function (e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        let hash = this.hash;
        console.log(hash)
        // animate
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - navHeight - 15
        }, 300, function () {
            // when done, add hash to url
            window.location.hash = hash;
        });

    });
});