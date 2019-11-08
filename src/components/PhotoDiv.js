import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import './PhotoDiv.scss';

function PhotoDiv({ photo }) {
  const [index, setIndex] = useState(0);
  const onClickRight = () => {
    setIndex(index => {
      if (index === photo.length - 1) {
        return 0;
      }
      return index + 1;
    });
  };
  const onClickLeft = () => {
    setIndex(index => {
      if (index === 0) {
        return photo.length - 1;
      }
      return index - 1;
    });
  };
  return (
    <div>
      <Icon className="left-button" type="left" onClick={onClickLeft} />
      <div className="img-box">
        <img src={photo[index]} />
      </div>
      <Icon className="right-button" type="right" onClick={onClickRight} />
    </div>
  );
}

export default PhotoDiv;
