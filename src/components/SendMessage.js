import React, { useState } from 'react';
import './SendMessage.scss';

const SendMessage = ({ message, onChange, onSubmit }) => {
  return (
    <div className="message-container">
      <div className="message-box">
        <div className="message-form-div">
          <form className="message-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="message"
              value={message}
              onChange={onChange}
              maxLength="20"
              required
            />
            <button type="submit">보내기</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
