import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { fetchHistory } from '../services/api.ts';
import { HistoryItem } from '../types/types.ts';

const DashboardPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetchHistory().then(setHistory);
  }, []);

  return (
    <Container className="mt-4">
      <Row xs={1} md={2} className="g-4">
        {history.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Header>
                <Card.Title>{item.date}</Card.Title>
                <Card.Subtitle className="text-muted">
                  {item.encryptedData.substring(0, 20)}...
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>{item.diagnosis}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardPage;