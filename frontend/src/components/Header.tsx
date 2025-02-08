import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">HealthGuard</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Chat</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">History</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;