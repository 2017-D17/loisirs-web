var App = App || {};
console.log('App in ClimbModule :', App)
App.ClimbModule = (function () {
    var initTemplate = function () {
        initCarousel()
        initScroll()
    }

    var initCarousel = function () {
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
    };

    var initScroll = function () {
        $(document).on("scroll", onScroll);

        let navHeight = $('nav').outerHeight();
        let navOffset = 20;
        console.log('navheight : ', navHeight)
        $('body').css('padding-top')
        $(window).resize(function () {
            navHeight = $('nav').outerHeight();
        });

        //$('body').scrollspy({ target: '#nav-escalade' })

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
    };
    var addCommentsEvents = function () {

    };

    return { initTemplate }
})()