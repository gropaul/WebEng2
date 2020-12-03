import React from 'react';
import {Card,CardHeader,CardContent} from 'framework7-react';
import './wikiInfo.css'

class WikiInfo extends React.Component {
	
	// Writes the error information to the state
	handleError(responseStatus, response) {
		this.setState(
			{
				"title": "Error :(",
				"subtitle": "Error-Code: " + responseStatus,
				"content": response
			}
		);
	}
	
	fetchWikipedia(locationName) {
		// Prepare String (Exchange spaces with '%20' and so on...)
		var locationNamePrepared = locationName.replace(' ', '%20');
		// Enter "Loading" Information in state
		this.setState(
			{
				"title": "Loading...",
				"subtitle": "Loading...",
				"content": "Loading..."
			}
		);
		// Fetch Wikipedia API
		// Step 1: Get title and page URL
		var responseStatus = 200;
		var wikiURL = "http://de.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + locationNamePrepared + "&format=json&origin=*";
		
		fetch(wikiURL)
			.then( response => {
				responseStatus = response.status;
				return response.json();
			})
			.then( json => {
				switch (responseStatus) {
					//Everything is fine
					case 200:
						var pageID = json.query.search[0].pageid;
						var pageTitle = json.query.search[0].title;
						var subtitle = json.query.search[0].snippet;

						//Step 2: Get description and small extract
						if (pageID == "") {
							this.handleError("Es wurde kein passender Inhalt zum Suchbegriff gefunden", "");
							return;
						}
						wikiURL = "http://de.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=" + pageID + "&origin=*";
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
												"title": pageTitle,
												"subtitle": subtitle,
												"content": content
											}
										);
										break;
									default:
										this.handleError(responseStatus, response);
										return;
								}
							})
							.catch(error => {
								alert("Es ist ein Fehler aufgetreten beim Abfragen des Seiteninhalts :(")
							});
						break;
					//Something went wrong
					default:
						this.handleError(responseStatus, response);
						return;
				}
			})
			.catch(error => {
				alert("Es ist ein Fehler aufgetreten bei der Suche :(")
			});
		return;
	}
	
	render(){
		return (
            <Card>
              <CardHeader className="header">
                  <div>
                <div className="header-title">state.title</div>
                <div className="header-subtitle">state.subtitle</div>
                </div>
              </CardHeader>
              <CardContent>
              state.content
              </CardContent>
            </Card>
        );
    }
	constructor() {
		super();
		this.fetchWikipedia("Ravensburg");
	}
}
export default WikiInfo;