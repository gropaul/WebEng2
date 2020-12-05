import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Navbar } from 'framework7-react';
import '../css/map.css';

class Map extends Component {

	render() {

		return (
			<div>
				<Navbar title="Karte" />
				<LeafletMap
					center={[48.137, 11.575]}
					zoom={7}>
					<TileLayer
						url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				</LeafletMap>

			</div>
		);
	}
}

export default Map
