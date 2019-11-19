import React from 'react';
import './SeekWaiting.scss';

function SeekWaiting() {
  return (
    <div className="seek-waiting-container">
      <div className="el-base">
        <div className="el-inner-space">
          <div className="el-flap"></div>
        </div>
      </div>
      <div className="text-wait-div">상대방이 힌트를 만드는 중입니다.</div>
    </div>
  );
}

export default SeekWaiting;
