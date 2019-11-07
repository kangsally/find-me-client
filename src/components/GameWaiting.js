import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import './GameWaiting.scss';

function GameWaiting() {
  return (
    <div className="game-container">
      <div className="icon">
        <Icon
          type="mail"
          style={{ fontSize: '10vh'}}
        />
      </div>
    </div>
  );
}

export default GameWaiting;
