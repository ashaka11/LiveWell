import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import './Dashboard.css'; // Ensure you import your CSS file

const DashboardPage = () => {
  // Well-being tips data
  const wellBeingTips = [
    {
      id: 1,
      title: 'Stay Hydrated',
      description: 'Drinking enough water is essential for maintaining energy levels and overall health.',
      source: 'https://www.healthline.com/health/staying-healthy',
      backgroundColor: '#f8d7da',
    },
    {
      id: 2,
      title: 'Regular Exercise',
      description: 'Engaging in regular physical activity can improve cardiovascular health and boost mood.',
      source: 'https://www.health.harvard.edu/staying-healthy/10-habits-for-good-health',
      backgroundColor: '#C1FFD7',

    },
    {
      id: 3,
      title: 'Quality Sleep',
      description: 'Aim for 7-9 hours of quality sleep each night to support mental and physical well-being.',
      source: 'https://www.nih.gov/health-information/emotional-wellness-toolkit',
      backgroundColor: '#f8d7da',

    },
    {
      id: 4,
      title: 'Balanced Diet',
      description: 'Incorporate a variety of fruits, vegetables, and lean proteins into your meals for optimal health.',
      source: 'https://www.healthline.com/nutrition/27-health-and-nutrition-tips',
      backgroundColor: '#acc7e0',

    },
    {
      id: 5,
      title: 'Mindfulness Meditation',
      description: 'Practicing mindfulness can help manage stress and enhance emotional health.',
      source: 'https://www.psychologytoday.com/us/blog/erasing-stigma/202001/18-ways-build-mental-wellness',
      backgroundColor: '#f8d7da',

    },
    {
      id: 6,
      title: 'Stress Management',
      description: 'Practicing relaxation techniques can help reduce stress and improve mood.',
      source: 'https://www.health.harvard.edu/staying-healthy/10-habits-for-good-health',
      backgroundColor: '#FFFAC1',

    },
    {
      id: 7,
      title: 'Social Connections',
      description: 'Maintaining relationships with friends and family contributes to emotional health.',
      source: 'https://www.health.harvard.edu/staying-healthy/10-habits-for-good-health',
      backgroundColor: '#F0C1FF',

    },
    // Add more tips as needed
  ];

  return (
    <Container className="mt-4">
      <h3>Welcome back!</h3>

      <h4 className="mt-4">Here are some general well-being tips for you:</h4>
      <Row className="g-4 mt-2">
        {wellBeingTips.map((tip, index) => (
          <Col key={tip.id} xs={12} md={6} lg={4}>
            <Card className="rounded-3" style={{ backgroundColor: tip.backgroundColor }}>
              <Card.Body>
                <Card.Title>{tip.title}</Card.Title>
                <Card.Text>{tip.description}</Card.Text>
                {tip.source && (
                  <Card.Link href={tip.source} target="_blank" rel="noopener noreferrer">
                    Learn more
                  </Card.Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardPage;
