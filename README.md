# WebEng2
Wilkommen bei der Dokumentation der Belegarbeit für Web Engineering 2!

## Aufgabenstellung
Entwickeln Sie eine Web-Applikation die innerhalb eines Location-Based-Service eine Karte darstellt. Innerhalb der Karte soll eine Position (oder aktueller Standort) mit ihren Geo-Koordinaten ausgewählt werden können. Über diese Koordinaten soll mittels Reverse-Geocoding der Ort ermittelt und über Wikipedia die entsprechenden Information zur Örtlichkeit ausgelesen und visualisiert werden" Anschließend soll die Fahrroute von der gegenwärtigen Position zum ausgewählten Ort dargestellt werden.

## Installieren
* 🔥 `install` - install all dependencies
---
* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build-dev` - build web app using development mode (faster build without minification and optimization)
* 🔧 `build-prod` - build web app for production

## Ansprechpartner

| Rolle                                  | Ansprechpartner           |
| -------------------------------------- | ------------------------- |
| Scrum Master                           | Tobias B., Paul G.        |
| Design und Layout                      | Sebastian R.              |
| Kartenkomponete                        | Daniel R.                 |
| Wikipedia Anbindung                    | Philipp K.                |
| Fahrtrouten                            | Niko                       |
| Reverse Geocoding und Location Service | Sven                      |

## Branching

Jede Gruppe bitte einen Branch für final und einen um zu arbeiten

## Kommunikation
Discord: https://discord.gg/Ve863Wzdnq
## Komponenten

### Design und Layout

### Karte
<b>Folgende Installationen ausführen:</b><br/><br/>
npm install<br/>
npm install react-redux<br/>
npm install react@^17.0.1 --save<br/>
npm install react-dom@^17.0.1 --save<br/>
npm install leaflet@^1.7.1 --save<br/>
npm install react-leaflet@^3.0.2 --save<br/>
npm install openrouteservice-js --save<br/>

<b>Komponente:</b><br/>Maps<br/>
<b>Koordinaten:</b>     <br/>latitudeStart
                <br/>longitudeStart
                <br/>latitudeEnd
                <br/>longitudeEnd<br/>

#### Schnittstelle für Marker der Postion des Nutzers

Popuptext setzen:

- Marker Userposition: `Maps.setStartText(text);`
- Marker Zielort: `Maps.setEndText(text);`

#### Schnittstelle für Marker für Wikipediaeinträge

### Reverse Geocoding

#### Schnittstellenbeschreibung

1.      geo2location.js <br>
Input: get_location(float lng, float lat) <br>
Output: String Datenstruktur: json <br>

Attribute:
```json
{
        "amenity":"Graf-Zeppelin-Haus",
        "house_number":"20",
        "road":"Olgastraße",
        "town":"Friedrichshafen",
        "municipality":"Verwaltungsgemeinschaft Friedrichshafen",
        "county":"Bodenseekreis",
        "state":"Baden-Württemberg",
        "postcode":"88045",
        "country":"Germany",
        "country_code":"de"
}
```
Wichtig: "amenity" ist nur manchmal vorhanden! <br>

2.      location2geo.js <br>
Input: get_geo(String Datenstruktur: json) <br>
Attribute: Straße, Hausnummer, Postleitzahl <br>
Output: String Datenstruktur: json <br>

Input: ort2geo(String Datenstruktur: json) <br>
Attribute: Ortname <br>
Output: String Datenstruktur: json <br>

Attribute:
```json
{ "longitude": "lng", "latitude": "lat" }
```


3.      get_position.js <br>
Input: get_position() <br>
Output: String Datenstruktur: json <br>

Attribute:
```json
{ "longitude": "lng", "latitude": "lat"}
```


### Wikipedia Anbindung
 Aufruf der Komponente erfolgt über die Redux - Action: `showWikiInfo(locationName)`</br>
 Schließen der Komponente erfolgt über die Redux - Action: `closeWikiInfo()`

 Der State `wikiInfoShown` zeigt an, ob die Komponente angezeigt wird oder nicht.
  `"SHOWN"` = angezeigt, `"NOT_SHOWN"`= nicht angezeigt

 #### Beispiel-Aufruf:
 ```javascript
 class DemoComponent extends Component {

        constructor(props) {
                super(props);
                this.onShowWikiInfo = this.onShowWikiInfo.bind(this);
        }
        onShowWikiInfo() {
                this.props.showWikiInfo("Stuttgart");
        }

        render() {
                return (
            <div>
                <button onClick={this.onShowWikiInfo}>
                    WikiInfo anzeigen
                </button>
            </div>
                )
        }
}
//Not used in this demo
let mapStateToProps = (state) => {
    return {
      wikiInfoShown: state.wikiInfoShown
    }
}
//used in this demo
let mapDispatchToProps = {
    showWikiInfo: showWikiInfo
}
let Container = connect(mapStateToProps, mapDispatchToProps)(DemoComponent);
export default Container;
 ```
 </br></br>
 #### Einbindung in Redux:
  /actions/index.js:
  ```javascript
   export function showWikiInfo(locationName){
     return {type: "SHOW_WIKI_INFO", locationName: locationName}
   }

   export function closeWikiInfo(){
     return {type: "CLOSE_WIKI_INFO"}
   }
   ```

 /reducers/wikiInfo.js:
 ```javascript
  let initialState = {wikiInfoShown: "NOT_SHOWN"};

  function wikiInfo(state = initialState,action){
         if (action.type == "SHOW_WIKI_INFO"){
        state = {wikiInfoShown: "SHOWN"};

        //TODO: Komponente starten und anzeigen
        return state;
         }

         if(action.type == "CLOSE_WIKI_INFO"){
        state = {wikiInfoShown: "NOT_SHOWN"};

        //TODO: Komponente schließen
        return state;
    }
    return state;
  }

  export default wikiInfo;
  ```
#### Schnittstellenbeschreibung

### Routenplaner
<b>Folgende Installationen ausführen:</b><br/><br/>
npm install openrouteservice-js --save

Genutztes Tool: OpenRouteService-API

TOKEN: 5b3ce3597851110001cf6248325551c86d55441f8d7e5d496d06a201

#### Schnittstellenbeschreibung

1.      Geo-Koordinaten: <br>
        Für die Berechnung der Route sind die Koordinaten von Start- und Endpunkt notwendig. <br>

2.      Map Interaktion: <br>
        Der Startpunkt soll durch das Klicken auf die Map gesetzt werden. Danach wird der Endpunkt durch erneutes klicken auf die Map gesetzt. <br>
        Außerdem soll es möglich sein Start- und Endpunkt in zwei Textfelder eingeben zu können. <br>
        Das Setzen des Endpunktes ist der Trigger zur Berechnung der Route. <br>
        Sobald die Route berechnet wurde, soll die Map die gesamte Route anzeigen/ auf die Route Zoomen. <br>
        Außerdem soll die Route farblich markiert werden. <br>

3.      Direction Liste: <br>
        Falls erwünscht - Anzeigen einer Liste mit der schrittweisen Beschreibung der Route. <br>
        Dazu benötigt - Form in die das reingeschrieben werden soll. Stellen nur die Set-Methode zur Verfügung zum Reinschreiben der Daten. <br>





