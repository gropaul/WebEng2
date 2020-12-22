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
  
	changeLongLat(){
		for (var i=0; i < directionCoordinates.length; i++) {
			var x = directionCoordinates[i][0];
			directionCoordinates[i][0] = directionCoordinates[i][1];
			directionCoordinates[i][1] =  x;
		}
	}

	calcRoute(startLatitude, startLongitude, endLatitude, endLongitude) {
		var url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248325551c86d55441f8d7e5d496d06a201&start="+ startLongitude + "," + startLatitude +"&end="+ endLongitude +","+ endLatitude +""

		return fetch(url)
			.then(response => response.json())
			.then((jsonData) => {
				directionCoordinates = jsonData.features[0].geometry.coordinates;
				this.changeLongLat();
				return directionCoordinates;
			});
		}
}
export default Weg;