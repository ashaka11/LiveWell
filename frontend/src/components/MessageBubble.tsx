import React from 'react';
import { Alert } from 'react-bootstrap';
import { Message } from '../types/types';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className={`d-flex ${message.isUser ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
      <Alert variant={message.isUser ? 'primary' : 'secondary'}>
        {message.text}
      </Alert>
    </div>
  );
};

export default MessageBubble;