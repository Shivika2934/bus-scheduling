import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBuses() {
      try {
        const response = await axios.get('http://localhost:3000/buses');
        setBuses(response.data);
      } catch (error) {
        setError('Error fetching buses.');
        console.error('Error fetching buses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBuses();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h2>Bus List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus Number</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.bus_number}</td>
              <td>{bus.capacity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default BusList;
