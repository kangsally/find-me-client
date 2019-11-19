import React, { useState } from 'react';
import Map from './Map.js';
import './HintMap.scss';

function HintMap({ hint, onClinkHideMap }) {
  const [place, setPlace] = useState(null);
  const onClick = category => {
    if (category === 'restaurant') {
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
        <div className="hint-header">
          <div className="hide-map-button-div">
            <button onClick={onClinkHideMap}>닫기</button>
          </div>
          <div className="place-box">{`나와 가장 가까운 ${place.category_group_name}은 ${place.place_name}이야!`}</div>
        </div>
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
          onClick('restaurant');
        }}
      >
        식당
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
