import React, { useState, useEffect } from 'react';
import './Counter.scss';

function Counter({ sendPhotos, finish, photo }) {
  const [count, setCount] = useState(15);

  useEffect(() => {
    const timeId = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, []);

  if (count === 0) {
    if (photo.length < 3) {
      finish('noPhoto', '사진이 부족해서 시작할 수 없어요ㅠㅠ');
    } else {
      sendPhotos();
    }
  }

  return (
    <div className="count-header">
      <div className="count-div">{count}</div>
    </div>
  );
}

export default Counter;
