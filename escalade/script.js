$(document).ready(function () {
    $('body').scrollspy({ target: '#nav-escalade' })

    $(".navbar ul li a[href^='#']").not('[href="#"]').on('click', function (e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        var hash = this.hash;
        console.log(hash)
        // animate
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 75
        }, 300, function () {
            // when done, add hash to url
            // (default click behaviour)

            window.location.hash = hash;
        });

    });
});