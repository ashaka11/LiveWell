import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Alert, Button, Modal, Form } from 'react-bootstrap';
import { fetchMedicalHistory } from '../services/api.ts';

interface MedicalHistoryItem {
  // id: string;
  symptoms: string;
  diagnosis: string;
  created_at: string;
}

const DashboardPage = () => {
  const [history, setHistory] = useState<MedicalHistoryItem[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MedicalHistoryItem | null>(null);

  useEffect(() => {
    fetchMedicalHistory().then(setHistory);
  }, []);


  return (
    <Container className="mt-4">
      <h3>Medical History</h3>
      {history && history.length > 0 ? (
        <Row xs={1} md={2} className="g-4 mt-2">
          {history.map((entry, index) => (
            <Col key={index}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <small>{new Date(entry.created_at).toLocaleDateString()}</small>
                </Card.Header>
                <Card.Body>
                  <Card.Text><strong>Symptoms:</strong> {entry.symptoms}</Card.Text>
                  <Card.Text><strong>Diagnosis:</strong> {entry.diagnosis}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No entries found.</Alert>
      )}
    </Container>
  );
};


export default DashboardPage;