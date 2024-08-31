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
  password: 'djokovic1010', // Change to your database password
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

// Example route to get all buses
app.get('/buses', async (req, res) => {
  try {
    const result = await pooll.query('SELECT * FROM buses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
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


