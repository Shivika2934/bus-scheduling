import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of buses from the backend
    axios.get('http://localhost:3000/buses')
      .then(response => {
        setBuses(response.data);
      })
      .catch(err => {
        setError('Failed to fetch buses');
        console.error('There was an error fetching the buses!', err);
      });
  }, []);

  return (
    <div>
      <h2>Bus List</h2>
      {error && <p>{error}</p>}
      <ul>
        {buses.length > 0 ? (
          buses.map(bus => (
            <li key={bus.id}>
              {bus.bus_number} - Capacity: {bus.capacity}
            </li>
          ))
        ) : (
          <p>No buses found.</p>
        )}
      </ul>
    </div>
  );
};

export default BusList;

