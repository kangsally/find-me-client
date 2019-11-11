import React, { useState, useEffect } from 'react';
import Map from './Map.js';
import './HintMap.scss';

function HintMap({ hint }) {
  const [place, setPlace] = useState(null);
  const onClick = category => {
    if (category === 'cafe') {
      setPlace(hint[0]);
    }
    if (category === 'bank') {
      setPlace(hint[1]);
    }
    if (category === 'convenientStore') {
      setPlace(hint[2]);
    }
  };
  if (place) {
    return (
      <div className="hint-container">
        <div className="header"> </div>
        <Map
          location={{
            lng: place.x,
            lat: place.y
          }}
          type="hint"
          place={place.place_name}
        />
      </div>
    );
  }
  return (
    <div className="hint-container">
      <button
        onClick={() => {
          onClick('cafe');
        }}
      >
        카페
      </button>
      <button
        onClick={() => {
          onClick('bank');
        }}
      >
        은행
      </button>
      <button
        onClick={() => {
          onClick('convenientStore');
        }}
      >
        편의점
      </button>
    </div>
  );
}

export default HintMap;
