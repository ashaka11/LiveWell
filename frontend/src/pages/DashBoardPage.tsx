import React from 'react';
import { Card, Row, Col, Container, Alert } from 'react-bootstrap';

const DashboardPage = () => {
  // Mock data
  const healthHistory = [
    { id: 1, date: '2023-10-01', snippet: 'EncryptedData123...', diagnosis: 'Possible flu' },
    { id: 2, date: '2023-10-02', snippet: 'EncryptedData456...', diagnosis: 'Stress-related' }
  ];

  return (
    <Container className="mt-4">
      <h3>Welcome back, User!</h3>
      <Alert variant="success" className="mt-3">
        Your encrypted health data is 100% secure 🔒
      </Alert>

      <h4 className="mt-4">Medical History</h4>
      <Row xs={1} md={2} className="g-4 mt-2">
        {healthHistory.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Header>
                <small className="text-muted">{item.date}</small>
              </Card.Header>
              <Card.Body>
                <Card.Text className="text-truncate">{item.snippet}</Card.Text>
                <Card.Subtitle className="text-primary">
                  AI Diagnosis: {item.diagnosis}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardPage;