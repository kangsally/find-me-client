import React, { useState, useEffect } from 'react';

function Hide() {
  const [count, setCount] = useState(15);
  let timeId;

  useEffect(() => {
    timeId = setInterval(() => {
      setCount(c => c - 1);
    }, 1000);
    console.log('이펙트');
    return () => clearInterval(timeId);
  }, []);
  console.log('렌더');
  if(count === 0){
    clearInterval(timeId);
      return <div>잠시만요</div>
  }
  return <div className="game-container">{count}</div>;
}

export default Hide;
