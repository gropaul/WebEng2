import React, { Component } from 'react';
import Openrouteservice from 'openrouteservice-js';

class Weg extends Component {

    constructor(testWeg) {
        super(testWeg);

        this.calcRoute = this.calcRoute.bind(this);

    }

    calcRoute(startLatitude, startLongitude, endLatitude, endLongitude) {
        var Directions = new Openrouteservice.Directions({
            api_key: "5b3ce3597851110001cf6248325551c86d55441f8d7e5d496d06a201"
        });
		
		console.log(startLatitude);
		console.log(startLongitude);
		console.log(endLatitude);
		console.log(endLongitude);

        Directions.calculate({
            coordinates: [[startLongitude, startLatitude], [endLongitude, endLatitude]],
            profile: "driving-car",
            extra_info: ["waytype", "steepness"],
            format: "json",
            api_version: 'v2',
        })
            .then(function (json) {
                // Add your own result handling here
                let apiresponse = JSON.stringify(json, null, "\t")
                var obj = JSON.parse(apiresponse);
				console.log(obj);
                console.log(obj.routes[0].segments[0].steps);
                var arrayLen = Object.keys(obj.routes[0].segments[0].steps).length;
                var response = "";

                for (var i = 0; i < arrayLen; i++) {
                    response = response + "<p> in " + obj.routes[0].segments[0].steps[i].distance + 'm ' + obj.routes[0].segments[0].steps[i].instruction + "</p>";
                }
                //response = response.replace(/(\n)/g, '<br>');
                //response = response.replace(/(\t)/g, '&nbsp;&nbsp;');
                //node.innerHTML = "<h3>Response</h3><p>" + response + "</p>";
                //node.innerHTML = response ;
                console.log(response);
            })
            .catch(function (err) {
                let response = JSON.stringify(err, null, "\t")
                console.error(response);
                //response = response.replace(/(\n)/g, '<br>');
                //response = response.replace(/(\t)/g, '&nbsp;&nbsp;');
                //node.innerHTML = "<h3>Error</h3><p>" + response + "</p>";
            });
    }
}
export default Weg;