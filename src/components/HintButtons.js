import React, { useState } from 'react';
import './HintButtons.scss';

const HintButtons = ({ firstHint, secondHint, onClick }) => {
  const [hintBox, setHintBox] = useState(null);
  const showFirstHint = text => {
    setHintBox(text);
  };

  return (
    <div className="hint-buttons-container">
      <button
        className={firstHint ? 'active' : 'non-active'}
        onClick={() => {
          onClick('first', firstHint, secondHint, showFirstHint);
        }}
      >
        {hintBox ? hintBox : '힌트 1'}
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
