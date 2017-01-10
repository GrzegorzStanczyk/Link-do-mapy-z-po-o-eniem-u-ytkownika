(function () {

    var supportOutput = document.querySelector("#supportOutput"),
        positionOutput = document.querySelector("#positionOutput"),
        setPosition = document.querySelector("#setPosition"),
        findPositionButton = document.querySelector("#findPosition");

    if (!navigator.geolocation) {
        supportOutput.innerHTML = "Twoja przeglądarka nie wspiera Geolokalizacji!";
        supportOutput.classList.add("alert-danger");
    } else {
        supportOutput.innerHTML = "Twoja przeglądarka wspiera Geolokalizację!";
        supportOutput.classList.add("alert-success");
    }

    function geoSuccess(position) {

        var LAT = position.coords.latitude,
            LON = position.coords.longitude;

        positionOutput.innerHTML = "Twoja pozycja to: " + LAT + ", " + LON;
    }

    function geoSuccessLoc(position) {

        var LAT = position.coords.latitude,
            LON = position.coords.longitude;

        var map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
            credentials: "Your Bing Maps Key",
            mapTypeId: Microsoft.Maps.MapTypeId.road
        });

        // Define the pushpin location
        var loc = new Microsoft.Maps.Location(LAT, LON);

        // Center the map on the location
        map.setView({
            center: loc,
            zoom: 14
        });

        // Add a pin to the center of the map
        var pin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pin);
    }

    function geoError(errorObj) {

        var errorMessage;

        switch (errorObj.code) {
            case errorObj.PERMISSION_DENIED:
                errorMessage = "Brak pozwolenia na znalezienie lokalizacji.";
                break;

            case errorObj.POSITION_UNAVAILABLE:
                errorMessage = "Brak dostępu do sieci.";
                break;

            case errorObj.TIMEOUT:
                errorMessage = "Przekroczono czas oczekiwania.";
                break;
        }

        positionOutput.innerHTML = "<strong>Wystąpił błąd: </strong>" + errorMessage;

    }

    var option = {
        timeout: 1000
    }

    setPosition.onclick = function () {

        positionOutput.innerHTML = "Czekaj...";

        navigator.geolocation.getCurrentPosition(geoSuccessLoc, geoError, option);

    }


    findPositionButton.onclick = function () {

        positionOutput.innerHTML = "Czekaj...";

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, option);

    }

})();