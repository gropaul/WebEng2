import React, { Component } from 'react';
import { Page, List, ListInput, Navbar, View, Panel, Block, Button, NavRight, NavLeft, Card } from 'framework7-react';
import Maps from '../components/Maps';
import '../css/root.css';
import {setEndInputMarker} from '../components/Maps';


export default class Root extends Component {
	constructor(){
		super();
		this.state = {
			endInput: ""
		  }
	}

	handleEndInputChanged(event) {
		// Update the state object
		this.setState({
			endInput: event.target.value
		});
	}

	handleEndInputClicked(event){
		setEndInputMarker(this.state.endInput);
		console.log(this.state.endInput);
	}

	render() {
		return (

			<div className='body'>
				<Panel right resizable themeDark className='panel'>
					<View>
						<Page>
							<a href="#" class="panel-close"><i class='icon f7-icons'>xmark_circle</i></a>
							<Block>Routeninformationen werden hier angezeigt</Block>
						</Page>
					</View>
				</Panel>

				<Navbar>
					<NavLeft>

						<img src='../static/icons/dhbw.png' className='logo' alt="DHBW"></img>
						<h1 className='ueberschriftRot'>WEB</h1><h1 className='ueberschriftGrau'>ENG II</h1>
					</NavLeft>
					<NavRight>
						<Button className='button_route' panelOpen="right">Routeninfos</Button>
					</NavRight>
				</Navbar>
				<div class='container'>
					<Card className='eingabe'>
						<List inlineLabels noHairlines>
							<ListInput
								onChange={this.handleEndInputChanged.bind(this)}
								label="Ziel"
								type="text"
								placeholder="Hier das Ziel eingeben"
								clearButton
							></ListInput>
							<button onClick={this.handleEndInputClicked.bind(this)}>Search</button>
						</List>
					</Card>
					<div id='map'><Maps></Maps></div>
				</div>
			</div>
		);
	}
}