
function location2geo(String str, String hausnummer, String plz) {
	
	//Abrufen der Koordinaten
	fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + str + ' ' + hausnummer + ', ' + plz)
	.then(function(response) {
				return response.json();
		})
		.then(function(json) {
	
		float lat = json[0].lat;
		float lng = json[0].lon;
		
		return lat, lng;
}