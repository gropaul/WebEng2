
var geoOptions = {
      enableHighAccuracy: true,     // Super-Präzisions-Modus
      timeout: 1000,                // Maximum Wartezeit
      maximumAge: 0                 // Maximum Cache-Alter
    }
	
function geoError(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      alert("ACHTUNG: Ohne Deine Geolocation-Daten ist die Funktionalität von viaLinked nur eingeschränkt möglich! Um die Geolocation-Funktionalität von viaLinked besser einschätzen zu können, klicke auf das 'viaLinked-Logo' oben links und lese bitte unser Datenschutz- und Nutzungsrichtlinien nach.");
    }
	
function geoSuccess(pos) {
	var coords = pos.coords;
	var lng = coords.longitude;
	var lat = coords.latitude;
	
	return lng, lat;
}

function get_position() {
	
	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    } else {
      alert("ACHTUNG: Geolocation wird von diesem System/Device nicht unterstützt! Die Funktionalität von viaLinked ist daher nur eingeschränkt möglich!");
	}
}


	