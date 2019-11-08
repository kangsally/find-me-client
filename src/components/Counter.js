import React, { useState, useEffect } from 'react';
import './Counter.scss';

function Counter({sendPhotos}) {
  const [count, setCount] = useState(15);

  useEffect(() => {
    const timeId = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);
    return () => clearInterval(timeId);
  }, []);

//   if (count === 0) {
//     sendPhotos();
//     return;
//   }
  return (
    <div className="header">
      <div className="count-div">{count}</div>
    </div>
  );
}

export default Counter;
