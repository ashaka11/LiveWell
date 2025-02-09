import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('authToken'); // Mock auth check

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">LiveWell</Navbar.Brand>
        <Nav className="me-auto">
          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            </>
          )}
        </Nav>
        {isLoggedIn && <Button variant="outline-light" onClick={handleLogout}>Logout</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;