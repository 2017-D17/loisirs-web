

FormModule = (function () {


    var form = function () {
        $('.form').find('input, textarea').on('keyup blur focus', function (e) {

            var $this = $(this),
                label = $this.prev('label');

            if (e.type === 'keyup') {
                if ($this.val() === '') {
                    label.removeClass('active highlight');
                } else {
                    label.addClass('active highlight');
                }
            } else if (e.type === 'blur') {
                if ($this.val() === '') {
                    label.removeClass('active highlight');
                } else {
                    label.removeClass('highlight');
                }
            } else if (e.type === 'focus') {

                if ($this.val() === '') {
                    label.removeClass('highlight');
                }
                else if ($this.val() !== '') {
                    label.addClass('highlight');
                }
            }

        });
    }

    var tab = function () {
        $('.tab a').on('click', function (e) {

            e.preventDefault();

            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');

            target = $(this).attr('href');

            $('.tab-content > div').not(target).hide();

            $(target).fadeIn(600);

        });
    }


    var inscription = function () {
        $('#inscription').on('click', function (e) {
            e.preventDefault();
            var name = document.getElementById("name2").value
            var password = document.getElementById("password2").value
            if (name == "" || password == "") {
                alert("champs vide !!!!");
                return;
            }
            AuthModule.inscription(name, password, function (connected) {

                if (connected) {
                    window.location.replace("poker/template/home.html");
                }
            });
        });
    }
    var connexion = function () {
        $('#connexion').on('click', function (e) {
            var name = document.getElementById("name2").value
            var password = document.getElementById("password2").value
            if (name == "" || password == "") {
                alert("champs vide !!!!");
                return;
            }
            AuthModule.connexion(name, password, (connected) => {
                if (connected) {
                    window.location.replace("poker/template/home.html");
                }
            })
        })
    }
    form()
    tab()
    inscription()
})()