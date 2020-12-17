
export function get_location(lng, lat) {
	
	return fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lng + '&lat=' + lat).
			then(function(response) {
					return response.json();
			}).
			then(function(json) {

				var data = json.address;

				//console.log(data);
				return data;
			})			
}