import React, { useState } from 'react';
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
    <div className="photo-container">
      <div className="left-button-div">
        <Icon className="left-button" type="left" onClick={onClickLeft} />
      </div>
      <div className="img-box">
        <img src={photo[index]} />
      </div>
      <div className="right-button-div">
        <Icon className="right-button" type="right" onClick={onClickRight} />
      </div>
    </div>
  );
}

export default PhotoDiv;
