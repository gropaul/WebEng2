
function get_geo(str, hausnummer, plz) {

	//Abrufen der Koordinaten
	fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + str + ' ' + hausnummer + ', ' + plz)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {

			var lat = json[0].lat;
			var lng = json[0].lon;

			var return_json = { "longitude": lng, "latitude": lat };

			//console.log(return_json);
			return return_json;
		})
}