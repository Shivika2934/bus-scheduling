import React from 'react';
import { Container, Card } from 'react-bootstrap';
import BusRouteMap from './BusRouteMap';

const RouteMap = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h1>Route Map</h1>
          <p>
            View the route map of all bus lines here.
          </p>
          <BusRouteMap />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RouteMap;
