import React, { useState } from 'react';
import { Form, Button, InputGroup, Container, Alert, Spinner } from 'react-bootstrap';
import { sendSymptoms } from '../services/api.ts'; // Import the API service

interface Message {
  id: number;
  symptoms: string;
  isUser: boolean;
}

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, symptoms: 'Hello! Describe your symptoms.', isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), symptoms: input, isUser: true }]);
    setInput(''); // Clear input

    // Call backend API
    setIsLoading(true);
    setError('');
    try {
      const response = await sendSymptoms(input); // Call backend API

      // Format the backend response for better readability
      const diagnosisMessage = `
        🩺 **Diagnosis:** ${response.diagnosis}

        🍏 **Dietary Recommendations:** ${response.dietary_recommendations}

        ❓ **Follow-up Questions:** ${typeof response.follow_up_questions === 'string' ? response.follow_up_questions : response.follow_up_questions.join(', ')}

        📌 **Summary:** ${response.summary}
      `;

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), symptoms: diagnosisMessage, isUser: false },
      ]);
    } catch (err) {
      setError('Failed to get diagnosis. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      {/* Message History */}
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <Alert
            key={msg.id}
            variant={msg.isUser ? 'primary' : 'secondary'}
            className={msg.isUser ? 'ms-auto' : 'me-auto'}
            style={{ maxWidth: '70%', margin: '10px 0', whiteSpace: 'pre-line' }} // Allow multiline messages
          >
            {msg.symptoms}
          </Alert>
        ))}
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      {/* Input Form */}
      <Form onSubmit={handleSubmit} className="mt-3">
        <InputGroup>
          <Form.Control
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your symptoms..."
            disabled={isLoading}
          />
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default ChatPage;
