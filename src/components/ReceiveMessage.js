import React from 'react';
import './ReceiveMessage.scss';

const ReceiveMessage = ({message}) => {
    return(
        <div className="message-container">
            <div className="message-box">
                <div className="message-text">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default ReceiveMessage;
