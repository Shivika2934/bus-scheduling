import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';

const { Pool } = pkg;

const app = express();
const port = 3000;

// Create a pool to connect to PostgreSQL
const pooll = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bus-scheduling',
  password: 'djokovic1010',
  port: 5432,
});

// Test the connection (without ending the pool)
pooll.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connection successful:', res.rows[0]);
  }
});

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Bus Scheduling System API');
});

// Get all buses
app.get('/buses', async (req, res) => {
  try {
    const result = await pooll.query('SELECT * FROM buses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new bus
app.post('/buses', async (req, res) => {
  const { bus_number, capacity } = req.body;
  try {
    const result = await pooll.query(
      'INSERT INTO buses (bus_number, capacity) VALUES ($1, $2) RETURNING *',
      [bus_number, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a bus
app.put('/buses/:id', async (req, res) => {
  const { id } = req.params;
  const { bus_number, capacity } = req.body;
  try {
    const result = await pooll.query(
      'UPDATE buses SET bus_number = $1, capacity = $2 WHERE id = $3 RETURNING *',
      [bus_number, capacity, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a bus
app.delete('/buses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pooll.query('DELETE FROM buses WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// In your backend Express server
app.get('/routes', async (req, res) => {
  try {
    const result = await pooll.query('SELECT * FROM routes'); // Ensure this includes latitude and longitude
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create a new route
app.post('/routes', async (req, res) => {
  const { route_name, start_location, end_location } = req.body;
  try {
    const result = await pooll.query(
      'INSERT INTO routes (route_name, start_location, end_location) VALUES ($1, $2, $3) RETURNING *',
      [route_name, start_location, end_location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a route
app.put('/routes/:id', async (req, res) => {
  const { id } = req.params;
  const { route_name, start_location, end_location } = req.body;
  try {
    const result = await pooll.query(
      'UPDATE routes SET route_name = $1, start_location = $2, end_location = $3 WHERE id = $4 RETURNING *',
      [route_name, start_location, end_location, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a route
app.delete('/routes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pooll.query('DELETE FROM routes WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all schedules
app.get('/schedules', async (req, res) => {
  try {
    const result = await pooll.query('SELECT * FROM schedules');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new schedule
app.post('/schedules', async (req, res) => {
  const { bus_id, route_id, departure_time, arrival_time } = req.body;
  try {
    const result = await pooll.query(
      'INSERT INTO schedules (bus_id, route_id, departure_time, arrival_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [bus_id, route_id, departure_time, arrival_time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a schedule
app.put('/schedules/:id', async (req, res) => {
  const { id } = req.params;
  const { bus_id, route_id, departure_time, arrival_time } = req.body;
  try {
    const result = await pooll.query(
      'UPDATE schedules SET bus_id = $1, route_id = $2, departure_time = $3, arrival_time = $4 WHERE id = $5 RETURNING *',
      [bus_id, route_id, departure_time, arrival_time, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a schedule
app.delete('/schedules/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pooll.query('DELETE FROM schedules WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all crew members
app.get('/crew', async (req, res) => {
  try {
    const result = await pooll.query('SELECT * FROM crew');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new crew member
app.post('/crew', async (req, res) => {
  const { name, role, bus_id } = req.body;
  try {
    const result = await pooll.query(
      'INSERT INTO crew (name, role, bus_id) VALUES ($1, $2, $3) RETURNING *',
      [name, role, bus_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a crew member
app.put('/crew/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role, bus_id } = req.body;
  try {
    const result = await pooll.query(
      'UPDATE crew SET name = $1, role = $2, bus_id = $3 WHERE id = $4 RETURNING *',
      [name, role, bus_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a crew member
app.delete('/crew/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pooll.query('DELETE FROM crew WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Graceful shutdown
const shutdown = () => {
  pooll.end(() => {
    console.log('Pool has ended');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
