import React, { Component } from 'react';
import { Page, List, ListInput, Navbar, View, Panel, Block, Button, NavRight } from 'framework7-react';
import Maps from '../components/Maps'


export default class Root extends Component {

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

				<Navbar title="WebEng2">
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

				<Maps></Maps>

			</div>
		);
	}
}
