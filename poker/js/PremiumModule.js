
PremiumModule = (function () {

    var deconnexionEvent = function () {
        $('#deconnexion').on('click', function (e) {
            AuthModule.deconnexion();
        });
    }

    deconnexionEvent()
})