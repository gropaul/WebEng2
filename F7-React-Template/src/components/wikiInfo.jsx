import React from 'react';
import {Card,CardHeader,CardContent} from 'framework7-react';
import './wikiInfo.css'

class WikiInfo extends React.Component {
    render(){
        return (
            <Card>
              <CardHeader className="header">
                  <div>
                <div className="header-title">Stuttgart</div>
                <div className="header-subtitle">Stadt in Baden-Württemberg</div>
                </div>
              </CardHeader>
              <CardContent>
              Stuttgart ist die Hauptstadt des südwestdeutschen Bundeslands Baden-Württemberg und ein bekannter Produktionsstandort. Sowohl Mercedes-Benzals auch Porsche haben hier ihren Hauptsitz und betreiben eigene Museen.Stuttgart verfügt über zahlreiche Parks, die sich als grüner Gürtel durch die Innenstadt ziehen. Beliebt sind unter anderem der Schlossgarten, der Rosensteinpark und der Park am Killesberg"
              </CardContent>
            </Card>
        );
    }
	
	// Writes the error information to the state
	function handleError(responseStatus, response) {
		this.setState(
			{
				"title": "Error :(",
				"subtitle": "Error-Code: " + responseStatus,
				"content": response
			}
		);
	}
	
	async function fetchWikipedia(locationName) {
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
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}
		var pageID = "";
		var pageTitle = "";
		var subtitle = "";
		var content = "";
		var wikiURL = "http://de.wikipedia.org/w/api.php?action=query&list=search&rsearch=" + locationNamePrepared + "&format=json";
		
		fetch(wikiURL, requestOptions)
			.then( response => {
				responseStatus = response.status;
				return response.json();
			})
			.then( json => {
				switch(responseStatus) {
					//Everything is fine
					case 200:
						pageID = json.query.results.search[0].pageid;
						pageTitle = json.query.results.search[0].title;
						subtitle = json.query.results.search[0].snippet;
						break;
					//Something went wrong
					default:
						handleError(responseStatus, response);
						return;
				}
			})
		//Step 2: Get description and small extract
		wikiURL = "http://de.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=" + pageID;
		fetch(wikiURL, requestOptions)
			.then( response => {
				responseStatus = response.status;
				return response.json();
			})
			.then( json => {
				switch(responseStatus) {
					case 200:
						content = json.query.pages[pageID].extract;
						break;
					default:
						handleError(responseStatus, response);
						return;
				}
			})
		//Old solution, might be a little bit out of date but is more readable	
		// Should work definitely as I use this style in other projects as well
		/*let response = await fetch(wikiURL, requestOptions);
		let responseData = await response.json();
		if (!responseData) {
			// TODO: Note down that there was nothing
			return;
		}
		let results = responseData.query;
		if (!results) {
			//TODO: Note down that there was no content
			return;
		}
		//First entry (most fitting one)
		results = results.search[0];
		// Extract information
		var pageID = results.pageid;
		var pageTitle = results.title;
		// Step 2: Get description and subtitle
		var subtitle = results.snippet;
		// Request page description
		wikiURL = "http://de.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=" + pageID;
		let responseDescription = await fetch(wikiURL, requestOptions);
		let responseDataDescription = await responseDescription.json();
		if(!responseDataDescription) {
			//TODO: Note down that there was nothing
			return;
		}
		let resultsDescription = responseDataDescription.query;
		if(!resultsDescription) {
			//TODO: Note down that there was no content
			return;
		}
		resultsDescription = resultsDescription.pages[pageID];
		var content = resultsDescription.extract;
		// Error handling => TODO*/
		// Write results to state
		this.setState(
			{
				"title": pageTitle,
				"subtitle": subtitle,
				"content": content
			}
		);
		return;
	}
}
export default WikiInfo;