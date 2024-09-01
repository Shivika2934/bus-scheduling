import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

function BusSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await axios.get('http://localhost:3000/schedules');
        setSchedules(response.data);
      } catch (error) {
        setError('Error fetching schedules.');
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedules();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h2>Bus Schedules</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus ID</th>
            <th>Route ID</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.bus_id}</td>
              <td>{schedule.route_id}</td>
              <td>{schedule.departure_time}</td>
              <td>{schedule.arrival_time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default BusSchedule;
