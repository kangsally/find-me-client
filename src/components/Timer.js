import React, { useState, useEffect } from 'react';
import './Timer.scss';

function Timer({ endTime, activateHints, type }) {
  const initialTime = new Date().getTime();

  const [time, setTime] = useState({
    minute: parseInt((endTime - initialTime) / 60000),
    second: parseInt(((endTime - initialTime) % 60000) / 1000)
  });

  useEffect(() => {
    const timeId = setInterval(() => {
      const presentTime = new Date().getTime();
      const milliseconds = endTime - presentTime;
      const minute = parseInt(milliseconds / 60000);
      const second = parseInt((milliseconds % 60000) / 1000);
      setTime({
        minute: minute < 10 ? '0' + minute : minute,
        second: second < 10 ? '0' + second : second
      });
      if (type === 'seek') {
        activateHints(milliseconds);
      }
    }, 1000);

    return () => clearInterval(timeId);
  }, []);

  return (
    <div className="header">
      <div className="count-div">
        {time.minute}:{time.second}
      </div>
    </div>
  );
}

export default Timer;
