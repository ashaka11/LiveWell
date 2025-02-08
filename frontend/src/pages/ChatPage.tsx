import React, { useState } from 'react';
import { Form, Button, InputGroup, Container, Alert } from 'react-bootstrap';
import { sendMessage } from '../services/api.ts';
import { Message } from '../types/types.ts';
import MessageBubble from '../components/MessageBubble.tsx';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await sendMessage(input);
    setMessages([...messages, 
      { id: Date.now().toString(), text: input, isUser: true },
      { id: Date.now().toString(), text: response, isUser: false }
    ]);
    setInput('');
  };

  return (
    <Container className="mt-4">
      {/* Message History */}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Input Form */}
      <Form onSubmit={handleSubmit} className="mt-3">
        <InputGroup>
          <Form.Control
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
          />
          <Button variant="primary" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default ChatPage;