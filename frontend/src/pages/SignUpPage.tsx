import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api.ts';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAPI.register(username, password);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError(err.toString());
    }
  };


  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Create Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
      <Alert variant="info" className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </Alert>
    </Container>
  );
};

export default SignupPage;