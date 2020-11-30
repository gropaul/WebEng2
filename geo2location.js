
function get_location(float lng, float lat) {
	
	fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).
			then(function(response) {
					return response.json();
			}).
			then(function(json) {
				
				return json;
			}			
}