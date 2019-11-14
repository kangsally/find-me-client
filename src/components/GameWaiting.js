import React from 'react';
import './GameWaiting.scss';

function GameWaiting() {
  return (
    <div className="game-container">
      <div className="pulsing-rings">
        <div className="pulsing-ringlet"></div>
        <div className="pulsing-ringlet"></div>
        <div className="pulsing-ringlet"></div>
      </div>
      <div className="text-div">상대방을 찾는 중입니다.</div>
    </div>
  );
}

export default GameWaiting;
