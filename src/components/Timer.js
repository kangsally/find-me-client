import React, { useState, useEffect } from 'react';
import './Timer.scss';

function Timer({ endTime }) {
  const initialTime = new Date().getTime();

  const [time, setTime] = useState({
    minute: parseInt((endTime - initialTime) / 60000),
    second: parseInt(((endTime - initialTime) % 60000) / 1000)
  });

  useEffect(() => {
    const timeId = setInterval(() => {
      const presentTime = new Date().getTime();
      setTime({
        minute:
          parseInt((endTime - presentTime) / 60000) < 10
            ? '0' + parseInt((endTime - presentTime) / 60000)
            : parseInt((endTime - presentTime) / 60000),
        second:
          parseInt(((endTime - presentTime) % 60000) / 1000) < 10
            ? '0' + parseInt(((endTime - presentTime) % 60000) / 1000)
            : parseInt(((endTime - presentTime) % 60000) / 1000)
      });
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
