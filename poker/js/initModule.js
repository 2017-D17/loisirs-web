
var initModule = (function () {

    var initialize = function () {
        window.addEventListener("load", function (event) {
            var connected = getCookie("userConnected");
            if (window.location.href == "http://127.0.0.1:8080/poker") {
                if (connected) {
                    $("#main").hide();
                    window.location.replace("http://127.0.0.1:8080/poker/template/home.html");
                }
                else {
                    $("#main").show();
                }
            }
            else {
                if (connected) {
                    displayComments(getAllComments());
                }
                else {
                    window.location.replace("http://127.0.0.1:8080/poker");
                }
            }
        });
    }

    return {
        init: initialize
    }

})();

initModule.init()
AuthModule.signout()