import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.scss';

const Marker = ({ text }) => {
  return (<div>
    {text? <div>{text}</div> :
    <div className="pulse"></div>}
  </div>)
};

function Map({ location, type }) {
  return (
    <div className="hide">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={{
          lat: location.lat,
          lng: location.lng
        }}
        defaultZoom={15}
      >
        <Marker lat={location.lat} lng={location.lng} />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
