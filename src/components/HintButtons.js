import React, { useState } from 'react';
import './HintButtons.scss';

const HintButtons = ({ firstHint, secondHint, onClick, distance }) => {
  return (
    <div className="hint-buttons-container">
      <button
        className={firstHint ? 'active' : 'non-active'}
        onClick={() => {
          onClick('first', firstHint, secondHint);
        }}
      >
        {distance ? distance : '힌트 1'}
      </button>
      <button
        className={secondHint ? 'active' : 'non-active'}
        onClick={() => {
          onClick('second', firstHint, secondHint);
        }}
      >
        힌트 2
      </button>
    </div>
  );
};

export default HintButtons;
