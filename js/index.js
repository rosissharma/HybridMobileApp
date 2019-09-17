var map;
var marker;
var trafficLayer;
var trafficOn = false;

function initMap() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 300000, timeout: 10000, enableHighAccuracy: true });
}

function changeLocation(selElem) {
    console.log("Changing marker position!");
    let coords = selElem.value.split(",");
    let lat = coords[0];
    let lng = coords[1];
    let myLatlng = new google.maps.LatLng(coords[0], coords[1]);
    let mapOptions = { zoom: 15, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    if (!map) {
        console.log("Map is not initialized yet");
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        marker = new google.maps.Marker({ position: myLatlng, map: map });
        return;
    }
    marker.setPosition(myLatlng);
    marker.addListener('click', function () {
        alert("Clicked on marker!");
    });
    map.panTo(myLatlng);
    map.setZoom(15);

    document.getElementById('lat').innerHTML = "Latitude: ";
    document.getElementById('lng').innerHTML = "Longitude: ";

    //append latitude to the page
    let pLat = document.getElementById('lat');
    let textLat = document.createTextNode(lat);
    pLat.appendChild(textLat);

    //append longtitude to the page
    let pLng = document.getElementById('lng');
    let textLng = document.createTextNode(lng);
    pLng.appendChild(textLng);

    //Gets user's selection of the location and puts the value on a label
    let x = document.getElementById('address').selectedIndex;
    let y = document.getElementById('address').options;
    document.getElementById('location').innerHTML = 'You Are Looking At ' + y[x].text;
}

function onSuccess(position) {
    if (position.coords) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        //Google Maps
        let myLatlng = new google.maps.LatLng(lat, lng);
        let mapOptions = { zoom: 13, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        marker = new google.maps.Marker({ position: myLatlng, map: map });

        //append latitude to the page
        let pLat = document.getElementById('lat');
        let textLat = document.createTextNode(lat);
        pLat.appendChild(textLat);

        //append longtitude to the page
        let pLng = document.getElementById('lng');
        let textLng = document.createTextNode(lng);
        pLng.appendChild(textLng);

        //displays the current local time and date
        document.getElementById('time').innerHTML = Date();

        //displays the location
        document.getElementById('location').innerHTML = 'You Are Looking At Rochester, NY';
    }
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function toggle() {
    //checks if traffic layer has already been instantiated
    if (!trafficOn && !trafficLayer) {
        trafficLayer = new google.maps.TrafficLayer();
        console.log(trafficLayer);
    }

    //if the traffic layer is on, it sets it to false
    //and sets the map to default(null)
    if (trafficOn) {
        trafficOn = false;
        trafficLayer.setMap(null);
    } else {
        trafficOn = true;//append longtitude to the page
        trafficLayer.setMap(map);//append the traffic layer to the page
    }
}

function time() {
    //displays the current local time and date
    document.getElementById('time').innerHTML = Date();
}