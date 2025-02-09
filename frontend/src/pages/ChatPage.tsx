import React, { useState } from 'react';
import { Form, Button, InputGroup, Container, Alert } from 'react-bootstrap';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! Describe your symptoms.', isUser: false }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { id: Date.now(), text: input, isUser: true }]);
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: 'Based on your symptoms, I recommend...', 
        isUser: false 
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <Container className="mt-4">
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <Alert 
            key={msg.id}
            variant={msg.isUser ? 'primary' : 'secondary'}
            className={msg.isUser ? 'ms-auto' : 'me-auto'}
            style={{ maxWidth: '70%', margin: '10px 0' }}
          >
            {msg.text}
          </Alert>
        ))}
      </div>

      <Form onSubmit={handleSubmit} className="mt-3">
        <InputGroup>
          <Form.Control
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your symptoms..."
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