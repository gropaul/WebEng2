
import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import "../css/map.css";
import L from 'leaflet';

/*
  Define global variables
*/

// Defining booleans, which check, if a marker has been set yet
var setFirstStartPoint = true;
var setFirstEndPoint = true;

// This booleans purpose is to enable the switch between setting the Startpoint and the Endpoint
var setStartPoint = false;

// Map-Coordinates for the Startpoint Marker
var latitudeStart = 0;
var longitudeStart = 0;

// Map-Coordinates for the Endpoint Marker
var latitudeEnd = 0;
var longitudeEnd = 0;

// Defining two layers, for each layer will contain one marker
var layerStart;
var layerEnd;

// Defining the icons for Start and Endpoint Marker
var iconStart = L.icon({
  iconUrl: '../static/icons/markerStart.png',
  iconSize: [30, 30]
});

var iconEnd = L.icon({
  iconUrl: '../static/icons/markerEnd.png',
  iconSize: [30, 30]
});

// Defining the options of the Start and Endpoint Marker - make it draggable and give it a title
var markerOptionsStart = {
  draggable: true,
  title: "Startpoint",
  icon: iconStart
}

var markerOptionsEnd = {
  draggable: true,
  title: "Endpoint",
  icon: iconEnd
}

/*
  Defining the needed functions
*/

// Function which is called by the "markerButtons", 
// its purpose is to switch the setStartPoint boolean value
// If the boolean value is true, its set false and the Buttons text will switch to "Endpoint"
// The button will always display the active Marker
function setMarkerStart(){
  if(setStartPoint){
    setStartPoint = false;
    document.getElementById("buttonMarker").innerHTML = "Endpoint";
  }
  else{
    setStartPoint = true;
    document.getElementById("buttonMarker").innerHTML = "Startpoint";
  }
}

// This function creates the Markers, set them to its layer and
// add the layer to the MapContainer
// This is called as an element in the HTML component
function MapMarker(props) {

  // Create a constant map, which contains a useMapEvent (those are defined by Leaflet)
  // which will be triggered when a mouseclick on the map happens
  // "Map" is linked to the MapContainer, which the function MapMarker is assigned to
  const map = useMapEvent('click', (e) => {

    // Check if the Startpoint should be set, or the Endpoint
    // If "setStartPoint" value is true, the Startpoint can be set, 
    // if its false, the Endpoint can be set
    if(setStartPoint){

      // The layer of the Startpoint shall only be removed, if a Marker is already set
      // Because a marker is set at your location at the beginning, it can always be removed
      layerStart.remove();

      // Get the latitude and longitude from the mouseclick event
      // The coordinates are stored in the Leaflet variable "latlng" as a JSON Object
      latitudeStart = e.latlng["lat"];
      longitudeStart = e.latlng["lng"];

      // Create a Marker with L (=Leaflet) with the saved latitude and longitude
      // and the global options for the Startpoint Marker 
      layerStart = L.marker([latitudeStart, longitudeStart], markerOptionsStart).addTo(map);

      // Add a popup to the marker
      if (props.starttext)
        layerStart.bindPopup(L.popup().setContent(props.starttext));

      // Add the layer to the constant map
      layerStart.addTo(map);

      // if the layerEnd has been set yet, then zoom, if not, don't zoom!
      if(setFirstEndPoint === false){
        // Set Map to maximum zoom with the 2 set markers
        map.fitBounds([
          [latitudeStart, longitudeStart],
          [latitudeEnd, longitudeEnd]
        ]);
      }

      // After the first Startpoint is set, the setFirstStartPoint value shall be false forever 
      // (at least, as long as the Website is not refreshed)
      // Also the setStartPoint value is set false, to switch to the Endpoint
      // As long as the markersButton is not clicked, the next if-Loop will end up
      // in the else Statement
      setFirstStartPoint = false;
      setStartPoint = false;

      // The Buttons text will switch to "Endpoint"
      // The button will always display the active Marker
      document.getElementById("buttonMarker").innerHTML = "Endpoint";
    }

    // --------------------------------------------------------------------------------------------------------
    // Set Endpoint function
    else{
      // The layer of the Endpoint shall only be removed, if a Marker is already set
      // If no Marker is set and the layer is removed, the Component crashes
      if(setFirstEndPoint === false){
        layerEnd.remove();
      }

      // Get the latitude and longitude from the mouseclick event
      // The coordinates are stored in the Leaflet variable "latlng" as a JSON Object
      latitudeEnd = e.latlng["lat"];
      longitudeEnd = e.latlng["lng"];

      // Set Map to maximum zoom with the 2 set markers
      map.fitBounds([
        [latitudeStart, longitudeStart],
        [latitudeEnd, longitudeEnd]
      ]);

      // Create a Marker with L (=Leaflet) with the saved latitude and longitude
      // and the global options for the Endpoint Marker 
      layerEnd = L.marker([latitudeEnd, longitudeEnd], markerOptionsEnd).addTo(map);

      // Add a popup to the marker
      if (props.endtext)
        layerEnd.bindPopup(L.popup().setContent(props.endtext));

      // Add the layer to the constant map
      layerEnd.addTo(map);

      // After the first Endpoint is set, the setFirstEndPoint value shall be false forever 
      // (at least, as long as the Website is not refreshed)
      // Also the setStartPoint value is set true, to switch to the Startpoint
      // As long as the markersButton is not clicked, the next if-Loop will end up
      // in the if(setStartPoint) Statement
      setFirstEndPoint = false;

      //setStartPoint = true;

      // The Buttons text will switch to "Startpoint"
      // The button will always display the active Marker
      
      //document.getElementById("buttonMarker").innerHTML = "Startpoint";
    }
  });
  
  // This part is called on the initialization of the map
  // It fetches the users location via navigator and sets the Maps center
  // to this location
  navigator.geolocation.getCurrentPosition(function(position) {
    
    // Save Startpoint Coordinates
    latitudeStart = position.coords.latitude;
    longitudeStart = position.coords.longitude;

    // Set Map Center to the Startpoint Coordinates
    map.flyTo([latitudeStart, longitudeStart]);

    // Place Marker on the Map, by adding it to the layer layerStart and adding the
    // layer to the Map -> layer is used to be able to delete the marker afterwards
    layerStart = L.marker([latitudeStart, longitudeStart], markerOptionsStart).addTo(map);

    // Add a popup to the marker
    if (props.starttext)
      layerStart.bindPopup(L.popup().setContent(props.starttext));

    layerStart.addTo(map);

    // For debug purposes, console log the Coordinates of the starting Point
    //console.log([latitudeStart, longitudeStart]);
  });

  return null;
}

/*
  This class contains the complete HTML-Site of this Component
  It contains the Map as a MapContainer on the left-hand side on the Website and 
  the button on the right-hand side
  The MapContainer contains a TileLayer, which is the base for the Leaflet Map,
  and the "Mapmarker" function as a HTML-Element
*/

class Maps extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        startPopupText: "<h1>Placeholder</h1>text for<br/>start popup",
        endPopupText: "<h1>Placeholder</h1>text for<br/>end popup"
      }
    }

    setEndText(text) {
      this.setState({endPopupText: text});
    }

    setStartText(text) {
      this.setState({startPopupText: text});
    }

    render() {
        return (
            <div>
              <div className="divButton">
                Active:<br></br>
                <button id="buttonMarker" className="markerButtons" onClick={setMarkerStart}>Endpoint</button>
              </div>
            <MapContainer id="map" center={[50.0, 9.0]} zoom={13} scrollWheelZoom={true} minZoom={3}>
              <MapMarker starttext={this.state.startPopupText} endtext={this.state.endPopupText}></MapMarker>
              <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
              </TileLayer>
            </MapContainer>
            </div>
        );
    }
}

export default Maps;

/*
<Marker position={[47.665217, 9.447650]} style="background-color: red">
  <Popup>
    <h1>Philipp ist der coolste!</h1>
  </Popup>
</Marker>
>>>>>>> origin/MapComponent_work
*/