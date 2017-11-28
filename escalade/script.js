$(document).ready(function () {
    $(document).on("scroll", onScroll);

    let navHeight = $('nav').height();
    $('body').css('padding-top', + navHeight + 15 + 'px');
    $(window).resize(function () {
        navHeight = $('nav').height();
        $('body').css('padding-top', + navHeight + 15 + 'px');
    });


    $('body').scrollspy({ target: '#nav-escalade' })

    $("#nav-escalade a[href^='#']").on('click', function (e) {
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
            //window.location.hash = hash;
        });

    });
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('#nav-escalade a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            var elemPos = refElement.position().top - navHeight - 15;
            if (elemPos <= scrollPos && elemPos + refElement.height() > scrollPos) {
                $('#nav-escalade ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }
});

