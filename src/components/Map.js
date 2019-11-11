import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.scss';

const Marker = () => {
  return (
    <div>
      <div className="pulse"></div>
    </div>
  );
};

function Map({ location, type, place }) {
  if (type === 'hide') {
    return (
      <div className={type}>
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

  if (type === 'hint') {
    return (
      <div className={type}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={{
            lat: Number(location.lat),
            lng: Number(location.lng)
          }}
          defaultZoom={15}
        >
          <Marker
            lat={Number(location.lat)}
            lng={Number(location.lng)}
            text={place}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
