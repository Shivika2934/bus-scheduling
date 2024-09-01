import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function PlanJourney() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/routes', {
        params: { start: startLocation, end: endLocation }
      });
      setRoutes(response.data);
    } catch (error) {
      setError('Error fetching routes.');
      console.error('Error fetching routes:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Plan Your Journey</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formStartLocation">
          <Form.Label>Start Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter start location"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEndLocation">
          <Form.Label>End Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter end location"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Find Routes
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {routes.length > 0 && (
        <div className="mt-5">
          <h4>Available Routes</h4>
          <ul className="list-group">
            {routes.map((route) => (
              <li key={route.id} className="list-group-item">
                {route.route_name}: {route.start_location} to {route.end_location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export default PlanJourney;
