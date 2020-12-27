import { popup } from "leaflet";

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

export function ort2geo(ort) {

	//Abrufen der Koordinaten
	return fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + ort)
		   .then(function (response) {
				return response.json();
			})
			.then(function (json) {
				console.log(json)
				if(json[0] == undefined){
					return undefined;
				}
				var lat = json[0].lat;
				var lng = json[0].lon;

				var return_json = { "longitude": lng, "latitude": lat };

				//console.log(return_json);
				return return_json;
		})
}