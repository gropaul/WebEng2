import React, { Component } from 'react';
import Card from "./Card";
import Openrouteservice from 'openrouteservice-js';

class Route extends Component {

    constructor(testRoute) {
        super(testRoute);

        this.calcRoute = this.calcRoute.bind(this);

		this.state = {
			startCoordinates: "",
			endCoordinates: ""
		}
    }

    onTaskInputChange(value, name) {
		var state = this.state;
		state[name] = value;
        this.setState(state);
		console.log(this.state)
    }

    calcRoute() {
        var Directions = new Openrouteservice.Directions({
            api_key: "5b3ce3597851110001cf6248325551c86d55441f8d7e5d496d06a201"
        });

        Directions.calculate({
            coordinates: [[8.690958, 49.404662], [8.687868, 49.390139]],
            profile: "driving-car",
            extra_info: ["waytype", "steepness"],
            format: "json",
            api_version: 'v2',
        })
            .then(function (json) {
                // Add your own result handling here
                let apiresponse = JSON.stringify(json, null, "\t")
                var obj = JSON.parse(apiresponse);
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
				console.log(this.state.startCoordinates)
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

    render() {
        return (
            <div className="Route-calc">
                <Card title="Navigation">
                    <hi>Navigation:</hi>
					<input
                        title="Start-Position"
                        onChange={e => this.onTaskInputChange(e.target.value, 'startCoordinates')}
                        type="text"
                        value={this.state.startCoordinates}
						placeholder="Start Latitude,Longitude"
                    />
                    <input
                        title="End-Position"
                        onChange={e => this.onTaskInputChange(e.target.value, 'endCoordinates')}
                        type="text"
                        value={this.state.endCoordinates}
						placeholder="End Latitude,Longitude"
                    />
                    <br></br>
                    <button
                        onClick={this.calcRoute}>
                        Route berechnen
					</button>
                </Card>
            </div>
        );
    }
}

Route.propTypes = {
    onAdd: React.PropTypes.func.isRequired
}

export default Route;