import React from 'react';
import './Ending.scss';

function Ending({ result, finishMessage, onClick }) {
  return (
    <div className="ending-container">
      <div className="ending-box ending-bounce">
        <div className="result-title">
          {result === 'success' ? '성공!' : '실패..'}
        </div>
        <div className="result-message">{finishMessage}</div>
        <div className="home-button-div">
          <button onClick={onClick}>홈으로</button>
        </div>
      </div>
    </div>
  );
}

export default Ending;
