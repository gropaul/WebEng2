import React, { Component } from 'react';
import { Page, List, ListInput, Navbar, View, Panel, Block, Button, NavRight, NavLeft, Card, CardContent } from 'framework7-react';
import Maps from '../components/Maps';
import '../css/root.css';


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

				<Navbar>
					<NavLeft>
						<h1 className='ueberschriftRot'>WEB</h1><h1 className='ueberschriftGrau'>ENG II</h1>
					</NavLeft>
					<NavRight>
						<Button panelOpen="right">Routeninfos</Button>
					</NavRight>
				</Navbar>
				<div class='container'>
					<div id='eingabe'><Card><List inlineLabels noHairlinesMd>
						<ListInput
							label="Ziel"
							type="text"
							placeholder="Hier das Ziel eingeben"
							clearButton
						></ListInput>
					</List></Card></div>



					<div id='map'><Maps></Maps></div>
				</div>
			</div>
		);
	}
}
