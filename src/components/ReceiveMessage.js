import React from 'react';
import './ReceiveMessage.scss';

const ReceiveMessage = ({ message }) => {
  return (
    <div className="receive-message-container">
      <div className="recieve-message-box">
        <div className="message-text">{message}</div>
      </div>
    </div>
  );
};

export default ReceiveMessage;
