import React from 'react';

const Message = ({ classes, messageText }) => (
  <div className={classes}>
    <p className="message">{messageText}</p>
  </div>
);

export default Message;
