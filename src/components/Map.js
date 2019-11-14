import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.scss';

const Marker = ({ type }) => {
  return (
    <div>
      <div className={type === 'hide' ? 'pulse' : 'pin bounce'}></div>
    </div>
  );
};

function Map({ location, type, place }) {
  if (type === 'hide') {
    return (
      <div className={type}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={{
            lat: location.lat,
            lng: location.lng
          }}
          defaultZoom={15}
        >
          <Marker lat={location.lat} lng={location.lng} type={type} />
        </GoogleMapReact>
      </div>
    );
  }

  if (type === 'hint') {
    return (
      <div className={type}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={{
            lat: Number(location.lat),
            lng: Number(location.lng)
          }}
          defaultZoom={15}
        >
          <Marker
            lat={Number(location.lat)}
            lng={Number(location.lng)}
            type={type}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
