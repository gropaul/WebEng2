import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./Maps.css";

class Maps extends React.Component {
    render() {
      return (
        <MapContainer center={[47.665217, 9.447650]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[47.665217, 9.447650]}>
            <Popup>
              Die Kartengruppe rockt!
            </Popup>
          </Marker>
        </MapContainer>);
    }
}

export default Maps;
