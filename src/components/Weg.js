import React, { Component } from 'react';

var directionList= [];
var directionCoordinates= [];
var duration= '';
var distance= '';

class Weg extends Component {

    constructor(testWeg) {
        super(testWeg);

        this.calcRoute = this.calcRoute.bind(this);

    }
	
	getDirectionCoordinates() {
		console.log(directionCoordinates);
		return directionCoordinates;
	}

    calcRoute(startLatitude, startLongitude, endLatitude, endLongitude) {
        var url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248325551c86d55441f8d7e5d496d06a201&start="+ startLongitude + "," + startLatitude +"&end="+ endLongitude +","+ endLatitude +""
		
		console.log(startLatitude);
		console.log(startLongitude);
		console.log(endLatitude);
		console.log(endLongitude);

		var JSON_Response = fetch(url)
			.then(response => response.json())
			.then((jsonData) => {
				console.log(jsonData)
				directionCoordinates = jsonData.features[0].geometry.coordinates;
				console.log(directionCoordinates);
			});
			
    }
}
export default Weg;