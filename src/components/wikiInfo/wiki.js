import {Card,CardHeader,CardContent,Preloader} from 'framework7-react';
import React from 'react';
import './wiki.css'
export default class Wiki {

    constructor(){
        this.state = {
        dataLoaded: "not_loaded",
        title: "",
        subtitle: "",
        content: "",
        page_url: ""
        }
    }

    displayError(){
        this.state = {
            dataLoaded: "error",
            title
        }
    }

    fetchWikipedia(locationName) {
		// Prepare String (Exchange spaces with '%20' and so on...)
		var locationNamePrepared = locationName.replace(' ', '%20');
		// Enter "Loading" Information in state
	
		// Fetch Wikipedia API
		// Step 1: Get title and page URL
		var responseStatus = 200;
		var wikiURL = "https://de.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + locationNamePrepared + "&format=json&origin=*";
		
		return new Promise((resolve,reject) =>{
			fetch(wikiURL).then( response => {
				responseStatus = response.status;
				response.json().then( json => {
                    switch (responseStatus) {
                        //Everything is fine
                        case 200:
                            //First: Let's check if there are any results...
                            if (typeof json.query.search === 'undefined' || json.query.search.length <= 0) {
                                this.displayError()
                                resolve();
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
                                    response.json().then(json => {
                                        switch (responseStatus) {
                                            case 200:
                                                var content = json.query.pages[pageID].extract;
                                                // console.log("Title: " + pageTitle);
                                                // console.log("Subtitle: " + subtitle);
                                                // console.log("Content: " + content);
                                                // Write results to state
                                                this.state = 
                                                    {
                                                        dataLoaded: "success",
                                                        title: pageTitle,
                                                        subtitle: subtitle,
                                                        content: content,
                                                        page_url: "https://de.wikipedia.org/wiki/"+pageTitle
                                                    }
                                                resolve("Success");
                                                break;
                                                
                                            default:
                                                this.displayError()
                                                resolve();
                                        }
                                        })
                                        .catch(error => {
                                            this.displayError()
                                            resolve();
                                    });
                                }).catch(error => {
                                    this.displayError()
                                    resolve();
                                })
                            break;
                        //Something went wrong
                        default:
                            this.displayError()
                            resolve();
                    }
                })
                .catch(error => {
                    this.displayError()
                    resolve();
                });
			}).catch(error => {
                this.displayError()
                resolve();
            })
			
		})
	}

    get_html(){
        let element;
		if(this.state.dataLoaded=="success"){
			element = <div>
				<CardHeader className="header">
                  <div>
                <div className="header-title">{this.state.title}</div>
                </div>
              </CardHeader>
              <CardContent>
              <p>{this.state.content}</p><p><a target="_blank" className="link external" href={this.state.page_url}>Wikipedia</a></p>
			  </CardContent>
			</div>;
		} else if(this.state.dataLoaded =="not_loaded") {
			element = <div id="loading_screen">
				<div id="loading_text">Wikipedia Informationen werden abgerufen</div>
				<div id="loader"><Preloader></Preloader></div>
			</div>;
		} else if(this.state.dataLoaded =="error"){
            element = <div>
                Wikipedia Information konnten nicht abgerufen werden.
            </div>
        }
        return (
            <Card>
             {element}
            </Card>
        )
    }
}