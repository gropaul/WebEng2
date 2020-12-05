import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Page, List, ListInput, Navbar, View, Panel, Block, Button, Col, NavRight } from 'framework7-react';
import '../css/map.css';

class Map extends Component {

	render() {

		return (
			<div>

				<Panel right resizable themeDark>
					<View>
						<Page>
							<Block>Routeninformationen werden hier angezeigt</Block>
						</Page>
					</View>
				</Panel>


				<Navbar title="Karte">
					<NavRight><Button panelOpen="right">Routeninfos</Button></NavRight>
				</Navbar>

				<List inlineLabels noHairlinesMd>
					<ListInput
						label="Start"
						type="text"
						placeholder="Hier den Startpunkt eingeben"
						clearButton
					>
					</ListInput>

					<ListInput
						label="Ziel"
						type="text"
						placeholder="Hier das Ziel eingeben"
						clearButton
					></ListInput>
				</List>



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
