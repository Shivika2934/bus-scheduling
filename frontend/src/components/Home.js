import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h1>Welcome to the Bus Scheduling System</h1>
          <p>
            This is the home page. You can plan your journey, view bus schedules, and more.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;


