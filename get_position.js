
var geoOptions = {
      enableHighAccuracy: true,     // Super-Präzisions-Modus
      timeout: 1000,                // Maximum Wartezeit
      maximumAge: 0                 // Maximum Cache-Alter
    }
	
function geoError(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      alert("ACHTUNG: Ohne Deine Geolocation-Daten ist die Funktionalität von get_position() nicht möglich!");
    }
	
function geoSuccess(pos) {
	var coords = pos.coords;
	var lng = coords.longitude;
	var lat = coords.latitude;

    var return_json = { longitude: lng, latidute: lat };

    //console.log(return_json);
    return return_json;
}

function get_position() {
	
	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    } else {
      alert("ACHTUNG: Geolocation wird von diesem System/Device nicht unterstützt! Die Funktionalität von get_position() ist nicht möglich!");
	}
}


	