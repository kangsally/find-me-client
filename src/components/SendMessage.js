import React, { useState } from 'react';
import './SendMessage.scss';

const SendMessage = ({ emitMessage }) => {
  const [message, setMessage] = useState('');

  const onChange = event => {
    const { value } = event.target;
    setMessage(value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    emitMessage(message);
    setMessage('');
  };

  return (
    <div className="message-box">
      <form onSubmit={onSubmit}>
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
  );
};

export default SendMessage;
