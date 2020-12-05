import React from 'react';
import {Card,CardHeader,CardContent,Preloader} from 'framework7-react';
import './wikiInfo.css'

class WikiInfo extends React.Component {
	
	constructor(props) {
		super(props);
		this.state =
			{
				dataLoaded: false,
				title: "",
				subtitle: "",
				content: ""
			}
		
		this.fetchWikipedia(props.locationName);
	}

	// Writes the error information to the state
	handleError(responseStatus, response, dataLoaded) {
		this.setState(
			{
				dataLoaded: dataLoaded,
				title: "Error :(",
				subtitle: "Error-Code: " + responseStatus,
				content: response
			}
		);
	}
	
	fetchWikipedia(locationName) {
		// Prepare String (Exchange spaces with '%20' and so on...)
		var locationNamePrepared = locationName.replace(' ', '%20');
		// Enter "Loading" Information in state
		this.setState(
			{
				dataLoaded: false,
				title: "",
				subtitle: "",
				content: ""
			}
		);
		// Fetch Wikipedia API
		// Step 1: Get title and page URL
		var responseStatus = 200;
		var wikiURL = "https://de.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + locationNamePrepared + "&format=json&origin=*";
		
		fetch(wikiURL)
			.then( response => {
				responseStatus = response.status;
				return response.json();
			})
			.then( json => {
				switch (responseStatus) {
					//Everything is fine
					case 200:
						//First: Let's check if there are any results...
						if (typeof json.query.search === 'undefined' || json.query.search.length <= 0) {
							this.handleError("Es wurde kein passender Inhalt zum Suchbegriff gefunden", "", true);
							return;
						}
						//Ok, there are results in the array, so we actually found something
						var pageID = json.query.search[0].pageid;
						var pageTitle = json.query.search[0].title;
						var subtitle = json.query.search[0].snippet;

						//Clean subtitle from html tags
						//The used regular expression removes every character that is not '<' or '>' between a '<' and a '>' or '$' (can have a leading '/', but that's optional)
						subtitle = subtitle.replace(/<\/?[^>]+(>|$)/g, "");

						//Step 2: Get description and small extract
						wikiURL = "https://de.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=" + pageID + "&origin=*";
						fetch(wikiURL)
							.then(response => {
								responseStatus = response.status;
								return response.json();
							})
							.then(json => {
								switch (responseStatus) {
									case 200:
										var content = json.query.pages[pageID].extract;
										console.log("Title: " + pageTitle);
										console.log("Subtitle: " + subtitle);
										console.log("Content: " + content);
										// Write results to state
										this.setState(
											{
												dataLoaded: true,
												title: pageTitle,
												subtitle: subtitle,
												content: content
											}
										);
										break;
									default:
										this.handleError(responseStatus, response, true);
										return;
								}
							})
							.catch(error => {
								alert("Es ist ein Fehler aufgetreten beim Abfragen des Seiteninhalts :(")
							});
						break;
					//Something went wrong
					default:
						this.handleError(responseStatus, response, true);
						return;
				}
			})
			.catch(error => {
				this.handleError(responseStatus, response, true);
				return;
			});
		return;
	}
	
	render(){

		let element;
		if(this.state.dataLoaded){
			element = <div>
				<CardHeader className="header">
                  <div>
                <div className="header-title">{this.state.title}</div>
                <div className="header-subtitle">{this.state.subtitle}</div>
                </div>
              </CardHeader>
              <CardContent>
              {this.state.content}
			  </CardContent>
			</div>;
		} else {
			element = <div id="loading_screen">
				<div id="loading_text">Wikipedia Informationen werden abgerufen</div>
				<div id="loader"><Preloader></Preloader></div>
			</div>;
		}
		return (
            <Card>
             {element}
            </Card>
        );
    }
}
export default WikiInfo;