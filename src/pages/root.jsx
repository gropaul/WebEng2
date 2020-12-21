import React, { Component } from 'react';
import { Page, List, ListInput, Navbar, View, Panel, Block, Button, NavRight, NavLeft, Card, CardContent } from 'framework7-react';
import Maps from '../components/Maps';
import '../css/root.css';


export default class Root extends Component {

	render() {
		return (
			<div>
				<Panel right resizable themeDark className='panel'>
					<View>
						<Page>
							<Block>Routeninformationen werden hier angezeigt</Block>
						</Page>
					</View>
				</Panel>

				<Navbar>
					<NavLeft>
						<img src='../static/icons/dhbw.png' className='logo'></img>
						<h1 className='ueberschriftRot'>WEB</h1><h1 className='ueberschriftGrau'>ENG II</h1>
					</NavLeft>
					<NavRight>
						<Button panelOpen="right">Routeninfos</Button>
					</NavRight>
				</Navbar>
				<div class='container'>
					<Card className='eingabe'><List inlineLabels noHairlines>
						<ListInput
							label="Ziel"
							type="text"
							placeholder="Hier das Ziel eingeben"
							clearButton
						></ListInput>
					</List></Card>



					<div id='map'><Maps></Maps></div>
				</div>
			</div>
		);
	}
}
