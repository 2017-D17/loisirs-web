var App = App || {};
App.GeoLocModule = (function () {

    var start = function () {
        $("#geolocbutton").on("click", (event) => {
            console.log('clicked')
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("Latitude: " + position.coords.latitude +
                    " Longitude: " + position.coords.longitude)

                var urlDir = "https://www.google.com/maps/dir/?api=1&origin=" + position.coords.latitude + "," + position.coords.longitude + "&destination=44.191657,3.206034"
                window.open(urlDir, '_blank');
                console.log(urlDir)
            })
        })
    }
    return { start }
})()